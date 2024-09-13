import {
  ComponentRef,
  isConcreteResponse,
  ObjectSchema,
  ObjectSchemaProperties,
  ConcreteResponse,
  ResponseBodyContent,
  ResponseHeaderByNameMap,
  Response,
} from '@oas3/specification';
import {
  CodeGenerationOutput,
  CodeGenerator,
  DefinitionOutput,
  OutputPath,
  OutputType,
} from './core';
import {GenerateConfig} from './generator';
import {applyZodObjectSchema, applyZodSchema} from '@oas3/codegen/ts/zodSchema';
import {applyObjectSchema, applySchema} from '@oas3/codegen/ts/schema';
import {
  templateResponsePayloadType,
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
  typeDefinition: DefinitionOutput;
  zodSchemaDefinition?: DefinitionOutput;
};

function applyResponseHeaders(
  codeGenerator: CodeGenerator,
  headersSchema: ResponseHeaderByNameMap,
  path: OutputPath,
  config: GenerateConfig
): ApplyResponseHeadersResult {
  const objectSchema = createObjectSchemaFromHeadersSchema(headersSchema);
  const typeDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    ...applyObjectSchema(codeGenerator, objectSchema, path, config),
  };
  codeGenerator.addOutput(typeDefinition, config);
  let zodSchemaDefinition: undefined | DefinitionOutput;
  if (config.withZod) {
    const zodSchemaDefinitionPath = [...path, 'zodSchema'];
    zodSchemaDefinition = {
      type: OutputType.DEFINITION,
      definitionType: 'const',
      createName: referencingPath => {
        return codeGenerator.createTypeName(path, referencingPath);
      },
      ...applyZodObjectSchema(
        codeGenerator,
        objectSchema,
        zodSchemaDefinitionPath,
        config
      ),
    };
    codeGenerator.addOutput(zodSchemaDefinition, config);
  }
  return {
    typeDefinition,
    zodSchemaDefinition,
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
  typeDefinition: DefinitionOutput;
  headersZodSchemaDefinition?: DefinitionOutput;
  bodyResults: ApplyResponseBodyResult[];
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
  let headersZodSchemaDefinition: undefined | DefinitionOutput;
  if (headersResult) {
    headersZodSchemaDefinition = headersResult.zodSchemaDefinition;
  }
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
  const typeDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    path,
    createCode: () => {
      if (!bodyResults.length) {
        return 'any';
      }
      const headersCodePart: string = headersResult
        ? `, ${headersResult.typeDefinition.createName(path)}`
        : '';
      const responseDefinitionCodeParts: string[] = bodyResults.map(
        bodyResult => {
          return `${templateResponsePayloadType.createName(path)}<'${
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
  codeGenerator.addOutput(typeDefinition, config);
  return {
    typeDefinition,
    headersZodSchemaDefinition,
    bodyResults,
  };
}

export type ApplyResponseResult = {
  typeCodeOutput: CodeGenerationOutput;
  headersZodSchemaDefinition?: DefinitionOutput;
  bodyResults: ApplyResponseBodyResult[];
};

export function applyResponse(
  codeGenerator: CodeGenerator,
  schema: Response,
  path: OutputPath,
  config: GenerateConfig
): ApplyResponseResult {
  if (isConcreteResponse(schema)) {
    const result = applyConcreteResponse(codeGenerator, schema, path, config);
    return {
      typeCodeOutput: {
        ...result.typeDefinition,
        getRequiredOutputPaths: () => [
          ...result.typeDefinition.getRequiredOutputPaths(config),
        ],
      },
      headersZodSchemaDefinition: result.headersZodSchemaDefinition,
      bodyResults: result.bodyResults,
    };
  }
  codeGenerator.findComponentResponseByRef();
}
