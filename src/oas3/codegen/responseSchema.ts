import {
  ConcreteResponse,
  isConcreteResponse,
  isResponseComponentRef,
  ObjectSchema,
  ObjectSchemaProps,
  RequestBodyContent,
  Response,
  ResponseBodyContentByContentTypeMap,
  ResponseComponentRef,
  ResponseHeaderByNameMap,
} from '@/oas3/specification';
import {
  CodeGenerationOutput,
  CodeGenerator,
  ComponentRefOutput,
  containsOutputPath,
  OutputPath,
  OutputType,
} from './core';
import {GenerateConfig} from './generator';
import {applyZodSchema} from './zodSchema';

type ApplyResponseBodyResult = {
  contentType: string;
  codeOutput: CodeGenerationOutput;
};

function applyResponseBodyContent(
  codeGenerator: CodeGenerator,
  contentType: string,
  bodyContent: RequestBodyContent,
  path: OutputPath,
  config: GenerateConfig
): ApplyResponseBodyResult {
  let zodSchemaCode: undefined | CodeGenerationOutput;
  if (config.withZod) {
    const zodSchemaPath = [...path, 'zodSchema'];
    zodSchemaCode = applyZodSchema(
      codeGenerator,
      bodyContent.schema,
      zodSchemaPath,
      config
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
  config: GenerateConfig
): CodeGenerationOutput {
  const bodyResults: ApplyResponseBodyResult[] = [];
  for (const contentType in schema) {
    const lowercaseContentType = contentType.toLowerCase();
    const contentTypeBodyPath = [...path, lowercaseContentType];
    const contentSchema = schema[contentType];
    bodyResults.push(
      applyResponseBodyContent(
        codeGenerator,
        lowercaseContentType,
        contentSchema,
        contentTypeBodyPath,
        config
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

function createHeadersObjectSchema(
  headersSchema: ResponseHeaderByNameMap
): ObjectSchema {
  const requiredProps: string[] = [];
  const props: ObjectSchemaProps = {};
  for (const headerName in headersSchema) {
    requiredProps.push(headerName);
    props[headerName] = headersSchema[headerName].schema;
  }
  return {
    type: 'object',
    properties: props,
    required: requiredProps,
  };
}

function applyConcreteResponseSchema(
  codeGenerator: CodeGenerator,
  schema: ConcreteResponse,
  path: OutputPath,
  config: GenerateConfig
): CodeGenerationOutput {
  let headersZodSchemaCodeOutput: undefined | CodeGenerationOutput;
  if (config.withZod && schema.headers) {
    const headersObjectSchema = createHeadersObjectSchema(schema.headers);
    headersZodSchemaCodeOutput = applyZodSchema(
      codeGenerator,
      headersObjectSchema,
      [...path, 'headers'],
      config
    );
  }
  let bodyByContentTypeMapCodeOutput: undefined | CodeGenerationOutput;
  if (schema.content) {
    bodyByContentTypeMapCodeOutput = applyResponseBodyByContentTypeMap(
      codeGenerator,
      schema.content,
      [...path, 'body'],
      config
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

function applyComponentRefResponseSchema(
  codeGenerator: CodeGenerator,
  schema: ResponseComponentRef,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const output: ComponentRefOutput = {
    type: OutputType.COMPONENT_REF,
    createName: referencingPath => {
      return codeGenerator.createComponentNameForConst(
        schema.$ref,
        referencingPath
      );
    },
    componentRef: schema.$ref,
    path,
    getRequiredOutputPaths: () => [
      codeGenerator.createOutputPathByComponentRefForConst(schema.$ref),
    ],
  };
  codeGenerator.addOutput(output, config, preventFromAddingComponentRefs);
  return {
    ...output,
    createCode: referencingPath =>
      codeGenerator.createComponentNameForConst(schema.$ref, referencingPath),
  };
}

export function applyResponseSchema(
  codeGenerator: CodeGenerator,
  response: Response,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  if (isResponseComponentRef(response)) {
    return applyComponentRefResponseSchema(
      codeGenerator,
      response,
      path,
      config,
      preventFromAddingComponentRefs
    );
  }
  if (isConcreteResponse(response)) {
    return applyConcreteResponseSchema(codeGenerator, response, path, config);
  }
  throw new Error(`response not supported: ${JSON.stringify(response)}`);
}
