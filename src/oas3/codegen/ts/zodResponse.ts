import {
  ObjectSchema,
  ObjectSchemaProperties,
  ResponseHeaderByNameMap,
} from '@oas3/specification';

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
