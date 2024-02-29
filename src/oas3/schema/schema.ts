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
import {SchemaCode, SchemaCodeManager} from './core';
import {
  createNumberSchemaCode,
  isNumberSchema,
  NumberSchema,
} from './numberSchema';
import {ArraySchema, createArraySchemaCode, isArraySchema} from './arraySchema';
import {
  ComponentSchema,
  createComponentSchemaCode,
  isComponentSchema,
} from './componentSchema';

export function isSchema(anyValue: any): anyValue is Schema {
  return (
    isComponentSchema(anyValue) ||
    isBooleanSchema(anyValue) ||
    isStringSchema(anyValue) ||
    isNumberSchema(anyValue) ||
    isArraySchema(anyValue) ||
    isObjectSchema(anyValue) ||
    isOneOfSchema(anyValue)
  );
}

export type Schema =
  | ComponentSchema
  | BooleanSchema
  | StringSchema
  | NumberSchema
  | ArraySchema
  | ObjectSchema
  | OneOfSchema;

export function createSchemaCode(
  schema: Schema,
  codeManager: SchemaCodeManager
): SchemaCode {
  if (isComponentSchema(schema)) {
    return createComponentSchemaCode(schema, codeManager);
  }
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
    return createArraySchemaCode(schema, codeManager);
  }
  if (isObjectSchema(schema)) {
    return createObjectSchemaCode(schema);
  }
  if (isOneOfSchema(schema)) {
    return createOneOfSchemaCode(schema);
  }
  throw new Error(`schema not supported: ${JSON.stringify(schema)}`);
}
