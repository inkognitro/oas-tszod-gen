import {SchemaCode} from './core';
import {isSchema, Schema} from './schema';

export function isArraySchema(anyValue: any): anyValue is ArraySchema {
  const value = anyValue as ArraySchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (value.type !== 'array') {
    return false;
  }
  if (value.nullable !== undefined && typeof value.nullable !== 'boolean') {
    return false;
  }
  if (!isSchema(value.items)) {
    return false;
  }
  return true;
}

export type ArraySchema = {
  type: 'array';
  nullable?: boolean;
  items: Schema;
};

export function createArraySchemaCode(schema: ArraySchema): SchemaCode {
  return {
    typeScriptCode: 'any[]', // todo: implement
  };
}
