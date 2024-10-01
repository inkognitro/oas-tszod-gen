import {
  ObjectSchema,
  ObjectSchemaProps,
  ConcreteResponse,
  ResponseBodyContent,
  ResponseHeaderByNameMap,
  isStringSchema,
  Response,
  isResponseComponentRef,
  isConcreteResponse,
  findConcreteSchema,
  ResponseComponentRef,
} from '@/oas3/specification';
import {
  CodeGenerationOutput,
  CodeGenerator,
  ComponentRefOutput,
  containsOutputPath,
  OutputPath,
  OutputType,
} from './core';
import {Context} from './generator';
import {applyObjectSchema, applySchema} from './schema';
import {
  templateResponseBodyDataType,
  templateResponseType,
  templateResponseUnionType,
} from './template';
import {applyNullableFormDataTypeDefinition} from './formData';

function createHeadersObjectSchema(
  codeGenerator: CodeGenerator,
  headersSchema: ResponseHeaderByNameMap
): ObjectSchema {
  const requiredProps: string[] = [];
  const props: ObjectSchemaProps = {};
  for (const headerName in headersSchema) {
    requiredProps.push(headerName);
    const headerSchema = headersSchema[headerName].schema;
    const concreteHeaderSchema = findConcreteSchema(
      codeGenerator.getSpecification(),
      headerSchema
    );
    if (isStringSchema(concreteHeaderSchema)) {
      props[headerName] = headerSchema;
      continue;
    }
    props[headerName] = {
      type: 'string',
    };
  }
  return {
    type: 'object',
    properties: props,
    required: requiredProps,
  };
}

function applyResponseHeaders(
  codeGenerator: CodeGenerator,
  headersSchema: ResponseHeaderByNameMap,
  path: OutputPath,
  ctx: Context
): CodeGenerationOutput {
  const objectSchema = createHeadersObjectSchema(codeGenerator, headersSchema);
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
    !bodyResults.length &&
    !headersCodeOutput &&
    !ctx.response?.genericStatusVariableValue;
  return {
    path,
    createCode: () => {
      const responseBodyCodeParts: string[] = bodyResults.map(bodyResult => {
        return `${templateResponseBodyDataType.createName(path)}<'${
          bodyResult.contentType
        }', ${bodyResult.codeOutput.createCode(path)}>`;
      });
      if (hasNoSpecificResponseProperties) {
        return templateResponseType.createName(path);
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
      return [
        ...outputPaths,
        templateResponseBodyDataType.path,
        hasNoSpecificResponseProperties
          ? templateResponseType.path
          : templateResponseUnionType.path,
      ];
    },
  };
}

function applyComponentRefResponse(
  codeGenerator: CodeGenerator,
  schema: ResponseComponentRef,
  path: OutputPath,
  ctx: Context,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const output: ComponentRefOutput = {
    type: OutputType.COMPONENT_REF,
    createName: referencingPath => {
      return codeGenerator.createComponentNameForType(
        schema.$ref,
        referencingPath
      );
    },
    componentRef: schema.$ref,
    path,
    getRequiredOutputPaths: () => [
      codeGenerator.createOutputPathByComponentRefForType(schema.$ref),
    ],
  };
  codeGenerator.addOutput(output, ctx, preventFromAddingComponentRefs);
  return {
    ...output,
    createCode: referencingPath => {
      const code = codeGenerator.createComponentNameForType(
        schema.$ref,
        referencingPath
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
  ctx: Context,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  if (isResponseComponentRef(response)) {
    return applyComponentRefResponse(
      codeGenerator,
      response,
      path,
      ctx,
      preventFromAddingComponentRefs
    );
  }
  if (isConcreteResponse(response)) {
    return applyConcreteResponse(codeGenerator, response, path, ctx);
  }
  throw new Error(`response not supported: ${JSON.stringify(response)}`);
}
