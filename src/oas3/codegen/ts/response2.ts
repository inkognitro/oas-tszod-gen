import {
  isConcreteResponse,
  ObjectSchema,
  ObjectSchemaProperties,
  ConcreteResponse,
  ResponseBodyContent,
  ResponseHeaderByNameMap,
  Response,
  isResponseComponentRef,
} from '@oas3/specification';
import {CodeGenerationOutput, CodeGenerator, OutputPath} from './core';
import {GenerateConfig} from './generator';
import {applyZodObjectSchema, applyZodSchema} from '@oas3/codegen/ts/zodSchema';
import {applyObjectSchema, applySchema} from '@oas3/codegen/ts/schema';
import {
  templateResponseTemplateType,
  templateResponseType,
} from '@oas3/codegen/ts/template';

function createObjectSchemaFromHeadersSchema(
  headersSchema: ResponseHeaderByNameMap
): ObjectSchema {
  const requiredProps: string[] = [];
  const props: ObjectSchemaProperties = {};
  for (const propName in headersSchema) {
    requiredProps.push(propName);
    props[propName] = headersSchema[propName].schema;
  }
  return {
    type: 'object',
    properties: props,
    required: requiredProps,
  };
}

type ApplyResponseHeadersResult = {
  typeCodeOutput: CodeGenerationOutput;
  zodSchemaCodeOutput?: CodeGenerationOutput;
};

function applyResponseHeaders(
  codeGenerator: CodeGenerator,
  headersSchema: ResponseHeaderByNameMap,
  path: OutputPath,
  config: GenerateConfig
): ApplyResponseHeadersResult {
  const objectSchema = createObjectSchemaFromHeadersSchema(headersSchema);
  const typeCodeOutput: CodeGenerationOutput = applyObjectSchema(
    codeGenerator,
    objectSchema,
    path,
    config
  );
  let zodSchemaCodeOutput: undefined | CodeGenerationOutput;
  if (config.withZod) {
    zodSchemaCodeOutput = applyZodObjectSchema(
      codeGenerator,
      objectSchema,
      [...path, 'zodSchema'],
      config
    );
  }
  return {
    typeCodeOutput,
    zodSchemaCodeOutput,
  };
}

type ApplyResponseBodyResult = {
  typeCodeOutput: CodeGenerationOutput;
  contentType: string;
  zodSchemaCodeOutput?: CodeGenerationOutput;
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
  let zodSchemaCodeOutput: CodeGenerationOutput | undefined;
  if (config.withZod) {
    zodSchemaCodeOutput = applyZodSchema(
      codeGenerator,
      contentSchema.schema,
      path,
      config
    );
  }
  return {
    contentType,
    typeCodeOutput,
    zodSchemaCodeOutput,
  };
}

type ApplyConcreteResponseResult = {
  typeCodeOutput: CodeGenerationOutput;
  headersZodSchemaCodeOutput?: CodeGenerationOutput;
};

function applyConcreteResponse(
  codeGenerator: CodeGenerator,
  schema: ConcreteResponse,
  path: OutputPath,
  config: GenerateConfig
): ApplyConcreteResponseResult {
  const headersResult = schema.headers
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
  const typeCodeOutput: CodeGenerationOutput = {
    path,
    createCode: () => {
      if (!bodyResults.length) {
        return 'any';
      }
      const headersCodePart: string = headersResult
        ? `, ${headersResult.typeCodeOutput.createCode(path)}`
        : '';
      const responseDefinitionCodeParts: string[] = bodyResults.map(
        bodyResult => {
          return `${templateResponseTemplateType.createName(path)}<'${
            bodyResult.contentType
          }',${bodyResult.typeCodeOutput.createCode(path)}${headersCodePart}>`;
        }
      );
      return `${responseDefinitionCodeParts.join(' | ')}`;
    },
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = bodyResults.reduce<OutputPath[]>(
        (current, bodyResult) => {
          const next = [...current];
          bodyResult.typeCodeOutput.getRequiredOutputPaths().forEach(path => {
            if (!current.includes(path)) {
              next.push(path);
            }
          });
          return next;
        },
        []
      );
      return [...outputPaths, templateResponseType.path];
    },
  };

  return {
    typeCodeOutput,
    headersZodSchemaCodeOutput: headersResult?.zodSchemaCodeOutput,
  };
}

// todo: add applyResponse function if required

// todo: use or remove
export function getConcreteResponse(
  response: Response,
  codeGenerator: CodeGenerator
): ConcreteResponse {
  if (!isResponseComponentRef(response)) {
    return response;
  }
  const responseRef = codeGenerator.findComponentResponseByRef(response.$ref);
  if (!responseRef) {
    throw new Error(
      `could not find schema for component with ref "${response.$ref}"`
    );
  }
  if (isResponseComponentRef(responseRef)) {
    return getConcreteResponse(responseRef, codeGenerator);
  }
  return responseRef;
}
