import {
  BooleanSchema,
  createBooleanSchemaCode,
  isBooleanSchema,
} from './booleanSchema';
import {
  createStringSchemaCode,
  isStringSchema,
  StringSchema,
} from './stringSchema';
import {
  createObjectSchemaCode,
  isObjectSchema,
  ObjectSchema,
} from './objectSchema';
import {createOneOfSchemaCode, isOneOfSchema, OneOfSchema} from './oneOfSchema';
import {SchemaCode} from './core';
import {
  createNumberSchemaCode,
  isNumberSchema,
  NumberSchema,
} from './numberSchema';
import {ArraySchema, createArraySchemaCode, isArraySchema} from './arraySchema';

export function isSchema(anyValue: any): anyValue is Schema {
  return (
    isBooleanSchema(anyValue) ||
    isStringSchema(anyValue) ||
    isNumberSchema(anyValue) ||
    isArraySchema(anyValue) ||
    isObjectSchema(anyValue) ||
    isOneOfSchema(anyValue)
    // todo: implement other schemas here!
  );
}

export type Schema =
  | BooleanSchema
  | StringSchema
  | NumberSchema
  | ArraySchema
  | ObjectSchema
  | OneOfSchema; // todo: implement other schemas here!
export function createSchemaCodeForTypescript(schema: Schema): SchemaCode {
  if (isBooleanSchema(schema)) {
    return createBooleanSchemaCode(schema);
  }
  if (isStringSchema(schema)) {
    return createStringSchemaCode(schema);
  }
  if (isNumberSchema(schema)) {
    return createNumberSchemaCode(schema);
  }
  if (isArraySchema(schema)) {
    return createArraySchemaCode(schema);
  }
  if (isObjectSchema(schema)) {
    return createObjectSchemaCode(schema);
  }
  if (isOneOfSchema(schema)) {
    return createOneOfSchemaCode(schema);
  }
  // todo: implement other schemas here!
  throw new Error(`schema not supported: ${JSON.stringify(schema)}`);
}
