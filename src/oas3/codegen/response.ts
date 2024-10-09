import {
  ConcreteResponse,
  ResponseBodyContent,
  ResponseHeaderByNameMap,
  Response,
  isResponseComponentRef,
  isConcreteResponse,
  ResponseComponentRef,
} from '@/oas3/specification';
import {
  CodeGenerationOutput,
  CodeGenerator,
  ComponentRefOutput,
  containsOutputPath,
  Context,
  OutputPath,
  OutputType,
} from './core';
import {applyObjectSchema, applySchema} from './schema';
import {
  templateResponseBodyDataType,
  templateResponseType,
  templateResponseUnionType,
} from './template';
import {applyNullableFormDataTypeDefinition} from './formData';
import {createResponseHeadersObjectSchema} from './endpointUtils';

function applyResponseHeaders(
  codeGenerator: CodeGenerator,
  headersSchema: ResponseHeaderByNameMap,
  path: OutputPath,
  ctx: Context
): CodeGenerationOutput {
  const objectSchema = createResponseHeadersObjectSchema(
    codeGenerator,
    headersSchema
  );
  return applyObjectSchema(codeGenerator, objectSchema, path, ctx);
}

type ApplyResponseBodyResult = {
  contentType: string;
  codeOutput: CodeGenerationOutput;
};

function applyResponseBodyContent(
  codeGenerator: CodeGenerator,
  contentType: string,
  contentSchema: ResponseBodyContent,
  parentPath: OutputPath,
  ctx: Context
): ApplyResponseBodyResult {
  if (contentType.toLowerCase().match(/multipart\/form-data;?.*/)) {
    const pathForFormData = [...parentPath, 'FormData'];
    const formDataTypeDefinition = applyNullableFormDataTypeDefinition(
      codeGenerator,
      contentSchema.schema,
      pathForFormData,
      ctx
    );
    return {
      contentType,
      codeOutput: {
        path: pathForFormData,
        createCode: referencingPath => {
          if (formDataTypeDefinition) {
            return formDataTypeDefinition.createName(referencingPath);
          }
          return 'FormData';
        },
        getRequiredOutputPaths: () => {
          if (formDataTypeDefinition) {
            return [formDataTypeDefinition.path];
          }
          return [];
        },
      },
    };
  }
  return {
    contentType,
    codeOutput: applySchema(
      codeGenerator,
      contentSchema.schema,
      [...parentPath, contentType],
      ctx
    ),
  };
}

function applyConcreteResponse(
  codeGenerator: CodeGenerator,
  schema: ConcreteResponse,
  path: OutputPath,
  ctx: Context
): CodeGenerationOutput {
  const headersCodeOutput = schema.headers
    ? applyResponseHeaders(
        codeGenerator,
        schema.headers,
        [...path, 'headers'],
        ctx
      )
    : null;
  const bodyResults: ApplyResponseBodyResult[] = [];
  for (const contentType in schema.content) {
    const contentSchema = schema.content[contentType];
    if (
      ctx.config.shouldAddResponseBodyContent &&
      !ctx.config.shouldAddResponseBodyContent(contentType, schema.content)
    ) {
      continue;
    }
    const bodyPath = [...path, 'body'];
    bodyResults.push(
      applyResponseBodyContent(
        codeGenerator,
        contentType,
        contentSchema,
        bodyPath,
        ctx
      )
    );
  }
  const hasNoSpecificResponseProperties =
    !bodyResults.length && !headersCodeOutput;
  return {
    path,
    createCode: () => {
      const responseBodyCodeParts: string[] = bodyResults.map(bodyResult => {
        return `${templateResponseBodyDataType.createName(path)}<'${
          bodyResult.contentType
        }', ${bodyResult.codeOutput.createCode(path)}>`;
      });
      if (hasNoSpecificResponseProperties) {
        const statusCodePart = ctx.response?.genericStatusVariableValue
          ? `<${ctx.response?.genericStatusVariableValue}>`
          : '';
        return `${templateResponseType.createName(path)}${statusCodePart}`;
      }
      const codeParts: string[] = [];
      if (ctx.response?.genericStatusVariableValue) {
        codeParts.push(`${ctx.response?.genericStatusVariableValue}`);
      } else if (responseBodyCodeParts.length || headersCodeOutput) {
        codeParts.push('any');
      }
      if (responseBodyCodeParts.length) {
        codeParts.push(responseBodyCodeParts.join(' | '));
      } else if (headersCodeOutput) {
        codeParts.push('any');
      }
      if (headersCodeOutput) {
        codeParts.push(headersCodeOutput.createCode(path));
      }
      return `${templateResponseUnionType.createName(path)}<${codeParts.join(
        ', '
      )}>`;
    },
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
      headersCodeOutput?.getRequiredOutputPaths().forEach(path => {
        if (!containsOutputPath(outputPaths, path)) {
          outputPaths.push(path);
        }
      });
      bodyResults.forEach(r => {
        r.codeOutput.getRequiredOutputPaths().forEach(path => {
          if (!containsOutputPath(outputPaths, path)) {
            outputPaths.push(path);
          }
        });
      });
      if (bodyResults.length) {
        outputPaths.push(templateResponseBodyDataType.path);
      }
      if (hasNoSpecificResponseProperties) {
        outputPaths.push(templateResponseType.path);
      } else {
        outputPaths.push(templateResponseUnionType.path);
      }
      return outputPaths;
    },
  };
}

function applyResponseComponentRef(
  codeGenerator: CodeGenerator,
  schema: ResponseComponentRef,
  path: OutputPath,
  ctx: Context
): CodeGenerationOutput {
  const output: ComponentRefOutput = {
    type: OutputType.COMPONENT_REF,
    createName: referencingPath => {
      return codeGenerator.createResponseComponentTypeName(
        schema.$ref,
        referencingPath,
        ctx
      );
    },
    componentRef: schema.$ref,
    path,
    getRequiredOutputPaths: () => [
      codeGenerator.createResponseComponentTypeOutputPath(schema.$ref, ctx),
    ],
  };
  codeGenerator.addOutput(output, ctx);
  return {
    ...output,
    createCode: referencingPath => {
      const code = codeGenerator.createResponseComponentTypeName(
        schema.$ref,
        referencingPath,
        ctx
      );
      const statusCode = ctx.response?.genericStatusVariableValue;
      if (!statusCode) {
        return code;
      }
      return `${code}<${statusCode}>`;
    },
  };
}

export function applyResponse(
  codeGenerator: CodeGenerator,
  response: Response,
  path: OutputPath,
  ctx: Context
): CodeGenerationOutput {
  if (isResponseComponentRef(response)) {
    return applyResponseComponentRef(codeGenerator, response, path, ctx);
  }
  if (isConcreteResponse(response)) {
    return applyConcreteResponse(codeGenerator, response, path, ctx);
  }
  throw new Error(`response not supported: ${JSON.stringify(response)}`);
}
