import {
  ConcreteResponse,
  isConcreteResponse,
  isResponseComponentRef,
  RequestBodyContent,
  Response,
  ResponseBodyContentByContentTypeMap,
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
import {applyZodSchema} from './zodSchema';
import {createResponseHeadersObjectSchema} from './endpointUtils';

type ApplyResponseBodyResult = {
  contentType: string;
  codeOutput: CodeGenerationOutput;
};

function applyResponseBodyContent(
  codeGenerator: CodeGenerator,
  contentType: string,
  bodyContent: RequestBodyContent,
  path: OutputPath,
  ctx: Context
): ApplyResponseBodyResult {
  let zodSchemaCode: undefined | CodeGenerationOutput;
  if (ctx.config.withZod) {
    const zodSchemaPath = [...path, 'zodSchema'];
    zodSchemaCode = applyZodSchema(
      codeGenerator,
      bodyContent.schema,
      zodSchemaPath,
      ctx
    );
  }
  const codeOutput: CodeGenerationOutput = {
    path,
    createCode: referencingPath => {
      const resultCodeParts: string[] = [];
      if (zodSchemaCode) {
        resultCodeParts.push(
          `zodSchema: ${zodSchemaCode.createCode(referencingPath)}`
        );
      }
      return `{\n${resultCodeParts.join(',\n')}\n}`;
    },
    getRequiredOutputPaths: () => {
      if (zodSchemaCode) {
        return zodSchemaCode.getRequiredOutputPaths();
      }
      return [];
    },
  };
  return {
    contentType,
    codeOutput,
  };
}

function applyResponseBodyByContentTypeMap(
  codeGenerator: CodeGenerator,
  schema: ResponseBodyContentByContentTypeMap,
  path: OutputPath,
  ctx: Context
): CodeGenerationOutput {
  const bodyResults: ApplyResponseBodyResult[] = [];
  for (const contentType in schema) {
    if (
      ctx.config.shouldAddResponseBodyContent &&
      !ctx.config.shouldAddResponseBodyContent(contentType, schema)
    ) {
      continue;
    }
    const lowercaseContentType = contentType.toLowerCase();
    const contentTypeBodyPath = [...path, lowercaseContentType];
    const contentSchema = schema[contentType];
    bodyResults.push(
      applyResponseBodyContent(
        codeGenerator,
        lowercaseContentType,
        contentSchema,
        contentTypeBodyPath,
        ctx
      )
    );
  }
  return {
    path,
    createCode: referencingPath => {
      if (!Object.keys(schema).length) {
        return '{}';
      }
      const codeParts: string[] = [];
      bodyResults.map(bodyResult => {
        codeParts.push(
          `'${bodyResult.contentType}': ${bodyResult.codeOutput.createCode(
            referencingPath
          )}`
        );
      });
      return `{\n${codeParts.join(',\n')}\n}`;
    },
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
      bodyResults.forEach(result => {
        result.codeOutput.getRequiredOutputPaths().forEach(outputPath => {
          if (!containsOutputPath(outputPaths, outputPath)) {
            outputPaths.push(outputPath);
          }
        });
      });
      return outputPaths;
    },
  };
}

function applyConcreteResponseSchema(
  codeGenerator: CodeGenerator,
  schema: ConcreteResponse,
  path: OutputPath,
  ctx: Context
): CodeGenerationOutput {
  let headersZodSchemaCodeOutput: undefined | CodeGenerationOutput;
  if (ctx.config.withZod && schema.headers) {
    const headersObjectSchema = createResponseHeadersObjectSchema(
      codeGenerator,
      schema.headers
    );
    headersZodSchemaCodeOutput = applyZodSchema(
      codeGenerator,
      headersObjectSchema,
      [...path, 'headers'],
      ctx
    );
  }
  let bodyByContentTypeMapCodeOutput: undefined | CodeGenerationOutput;
  if (schema.content) {
    bodyByContentTypeMapCodeOutput = applyResponseBodyByContentTypeMap(
      codeGenerator,
      schema.content,
      [...path, 'body'],
      ctx
    );
  }
  return {
    path,
    createCode: referencingPath => {
      const codeParts: string[] = [];
      if (headersZodSchemaCodeOutput) {
        codeParts.push(
          `headersZodSchema: ${headersZodSchemaCodeOutput.createCode(
            referencingPath
          )}`
        );
      }
      if (bodyByContentTypeMapCodeOutput) {
        codeParts.push(
          `bodyByContentType: ${bodyByContentTypeMapCodeOutput.createCode(
            referencingPath
          )}`
        );
      } else {
        codeParts.push('bodyByContentType: {}');
      }
      return `{\n${codeParts.join(',\n')}\n}`;
    },
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
      if (headersZodSchemaCodeOutput) {
        headersZodSchemaCodeOutput
          .getRequiredOutputPaths()
          .forEach(outputPath => {
            if (!containsOutputPath(outputPaths, outputPath)) {
              outputPaths.push(outputPath);
            }
          });
      }
      if (bodyByContentTypeMapCodeOutput) {
        bodyByContentTypeMapCodeOutput
          .getRequiredOutputPaths()
          .forEach(outputPath => {
            if (!containsOutputPath(outputPaths, outputPath)) {
              outputPaths.push(outputPath);
            }
          });
      }
      return outputPaths;
    },
  };
}

function applyResponseSchemaComponentRef(
  codeGenerator: CodeGenerator,
  schema: ResponseComponentRef,
  path: OutputPath,
  ctx: Context
): CodeGenerationOutput {
  const output: ComponentRefOutput = {
    type: OutputType.COMPONENT_REF,
    createName: referencingPath => {
      return codeGenerator.createResponseComponentConstName(
        schema.$ref,
        referencingPath,
        ctx
      );
    },
    componentRef: schema.$ref,
    path,
    getRequiredOutputPaths: () => [
      codeGenerator.createResponseComponentSchemaConstOutputPath(
        schema.$ref,
        ctx
      ),
    ],
  };
  codeGenerator.addOutput(output, ctx);
  return {
    ...output,
    createCode: referencingPath =>
      codeGenerator.createResponseComponentConstName(
        schema.$ref,
        referencingPath,
        ctx
      ),
  };
}

export function applyResponseSchema(
  codeGenerator: CodeGenerator,
  response: Response,
  path: OutputPath,
  ctx: Context
): CodeGenerationOutput {
  if (isResponseComponentRef(response)) {
    return applyResponseSchemaComponentRef(codeGenerator, response, path, ctx);
  }
  if (isConcreteResponse(response)) {
    return applyConcreteResponseSchema(codeGenerator, response, path, ctx);
  }
  throw new Error(`response not supported: ${JSON.stringify(response)}`);
}
