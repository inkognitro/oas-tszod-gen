import {
  ObjectSchema,
  ObjectSchemaProperties,
  ConcreteResponse,
  ResponseBodyContent,
  ResponseHeaderByNameMap,
  isStringSchema,
  ComponentRef,
  Response,
  isResponseComponentRef,
  isConcreteResponse,
} from '@oas3/specification';
import {
  CodeGenerationOutput,
  CodeGenerator,
  ComponentRefOutput,
  containsOutputPath,
  OutputPath,
  OutputType,
} from './core';
import {GenerateConfig} from './generator';
import {applyObjectSchema, applySchema} from '@oas3/codegen/ts/schema';
import {
  templateResponseBodyDataType,
  templateResponseDataType,
} from '@oas3/codegen/ts/template';
import {findConcreteSchema} from '@oas3/specification/util';

function createHeadersObjectSchema(
  codeGenerator: CodeGenerator,
  headersSchema: ResponseHeaderByNameMap
): ObjectSchema {
  const requiredProps: string[] = [];
  const props: ObjectSchemaProperties = {};
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
  config: GenerateConfig
): CodeGenerationOutput {
  const objectSchema = createHeadersObjectSchema(codeGenerator, headersSchema);
  return applyObjectSchema(codeGenerator, objectSchema, path, config);
}

type ApplyResponseBodyResult = {
  contentType: string;
  codeOutput: CodeGenerationOutput;
};

function applyResponseBodyContent(
  codeGenerator: CodeGenerator,
  contentType: string,
  contentSchema: ResponseBodyContent,
  path: OutputPath,
  config: GenerateConfig
): ApplyResponseBodyResult {
  // todo: generate FormData type in case of "multipart/form-data"
  const typeCodeOutput: CodeGenerationOutput = applySchema(
    codeGenerator,
    contentSchema.schema,
    path,
    config
  );
  return {
    contentType,
    codeOutput: typeCodeOutput,
  };
}

function applyConcreteResponse(
  codeGenerator: CodeGenerator,
  schema: ConcreteResponse,
  path: OutputPath,
  config: GenerateConfig
): CodeGenerationOutput {
  const headersCodeOutput = schema.headers
    ? applyResponseHeaders(
        codeGenerator,
        schema.headers,
        [...path, 'headers'],
        config
      )
    : null;
  const bodyResults: ApplyResponseBodyResult[] = [];
  for (const contentType in schema.content) {
    const contentSchema = schema.content[contentType];
    const contentPath = [...path, 'body', contentType];
    bodyResults.push(
      applyResponseBodyContent(
        codeGenerator,
        contentType,
        contentSchema,
        contentPath,
        config
      )
    );
  }
  return {
    path,
    createCode: () => {
      const responseBodyCodeParts: string[] = bodyResults.map(bodyResult => {
        return `${templateResponseBodyDataType.createName(path)}<'${
          bodyResult.contentType
        }', ${bodyResult.codeOutput.createCode(path)}>`;
      });
      if (!bodyResults.length && !headersCodeOutput) {
        return 'any';
      }
      const codeParts: string[] = [
        !bodyResults.length ? 'any' : `${responseBodyCodeParts.join(' | ')}`,
      ];
      if (headersCodeOutput) {
        codeParts.push(headersCodeOutput.createCode(path));
      }
      return `${templateResponseDataType.createName(path)}<${codeParts.join(
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
        templateResponseDataType.path,
      ];
    },
  };
}

function applyComponentRefResponse(
  codeGenerator: CodeGenerator,
  schema: ComponentRef,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const output: ComponentRefOutput = {
    type: OutputType.COMPONENT_REF,
    createName: referencingPath => {
      return codeGenerator.createComponentTypeName(
        schema.$ref,
        referencingPath
      );
    },
    componentRef: schema.$ref,
    path,
    getRequiredOutputPaths: () => [
      codeGenerator.createOutputPathByComponentRef(schema.$ref),
    ],
  };
  codeGenerator.addOutput(output, config, preventFromAddingComponentRefs);
  return {
    ...output,
    createCode: referencingPath =>
      codeGenerator.createComponentTypeName(schema.$ref, referencingPath),
  };
}

export function applyResponse(
  codeGenerator: CodeGenerator,
  response: Response,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  if (isResponseComponentRef(response)) {
    return applyComponentRefResponse(
      codeGenerator,
      response,
      path,
      config,
      preventFromAddingComponentRefs
    );
  }
  if (isConcreteResponse(response)) {
    return applyConcreteResponse(codeGenerator, response, path, config);
  }
  throw new Error(`response not supported: ${JSON.stringify(response)}`);
}
