import {SchemaCode} from './core';

export function isBooleanSchema(anyValue: any): anyValue is BooleanSchema {
  const value = anyValue as BooleanSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (value.type !== 'boolean') {
    return false;
  }
  if (value.nullable !== undefined && typeof value.nullable !== 'boolean') {
    return false;
  }
  return true;
}

export type BooleanSchema = {
  type: 'boolean';
  nullable?: boolean;
};

export function createBooleanSchemaCode(schema: BooleanSchema): SchemaCode {
  let ts = 'boolean';
  if (schema.nullable) {
    ts = `null | ${ts}`;
  }
  return {
    typeScriptCode: ts,
  };
}
