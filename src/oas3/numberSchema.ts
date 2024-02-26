import {SchemaCode} from './core';

export function isNumberSchema(anyValue: any): anyValue is NumberSchema {
  const value = anyValue as NumberSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (value.type !== 'number') {
    return false;
  }
  if (value.format !== undefined && typeof value.format !== 'string') {
    return false;
  }
  if (value.nullable !== undefined && typeof value.nullable !== 'boolean') {
    return false;
  }
  if (value.minimum !== undefined && typeof value.minimum !== 'number') {
    return false;
  }
  if (
    value.exclusiveMinimum !== undefined &&
    typeof value.exclusiveMinimum !== 'number'
  ) {
    return false;
  }
  if (value.maximum !== undefined && typeof value.maximum !== 'number') {
    return false;
  }
  if (
    value.exclusiveMaximum !== undefined &&
    typeof value.exclusiveMaximum !== 'number'
  ) {
    return false;
  }
  return true;
}

export type NumberSchema = {
  type: 'number';
  format?: 'string';
  nullable?: boolean;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
};

export function createNumberSchemaCode(schema: NumberSchema): SchemaCode {
  let codeComment: undefined | string = undefined;
  let ts = 'number';
  if (schema.nullable) {
    ts = `null | ${ts}`;
  }
  if (schema.format) {
    codeComment = schema.format;
  }
  return {
    typeScriptCode: ts,
    codeComment,
  };
}
