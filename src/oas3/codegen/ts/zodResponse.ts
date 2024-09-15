import {
  ObjectSchema,
  ObjectSchemaProperties,
  Response,
  ResponseHeaderByNameMap,
} from '@oas3/specification';
import {CodeGenerator, OutputPath} from './core';
import {GenerateConfig} from './generator';

// todo: use or remove
function createObjectSchemaForHeadersZodSchema(
  headersSchema: ResponseHeaderByNameMap
): ObjectSchema {
  const requiredProps: string[] = [];
  const props: ObjectSchemaProperties = {};
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

export function addZodResponseOutputs(
  generator: CodeGenerator,
  response: Response,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
) {
  // todo: implement
}
