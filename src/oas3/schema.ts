import {
  BooleanSchema,
  createBooleanSchemaCodeForTypescript,
  isBooleanSchema,
} from './booleanSchema';
import {
  createStringSchemaCodeForTypescript,
  isStringSchema,
  StringSchema,
} from './stringSchema';
import {
  createObjectSchemaCodeForTypescript,
  isObjectSchema,
  ObjectSchema,
} from './objectSchema';
import {
  createOneOfSchemaCodeForTypescript,
  isOneOfSchema,
  OneOfSchema,
} from './oneOfSchema';

export function isSchema(anyValue: any): anyValue is Schema {
  return (
    isBooleanSchema(anyValue) ||
    isStringSchema(anyValue) ||
    isObjectSchema(anyValue) ||
    isOneOfSchema(anyValue)
    // todo: implement other schemas here!
  );
}

export type Schema = BooleanSchema | StringSchema | ObjectSchema | OneOfSchema; // todo: implement other schemas here!
export function createSchemaCodeForTypescript(schema: Schema): string {
  if (isBooleanSchema(schema)) {
    return createBooleanSchemaCodeForTypescript(schema);
  }
  if (isStringSchema(schema)) {
    return createStringSchemaCodeForTypescript(schema);
  }
  if (isObjectSchema(schema)) {
    return createObjectSchemaCodeForTypescript(schema);
  }
  if (isOneOfSchema(schema)) {
    return createOneOfSchemaCodeForTypescript(schema);
  }
  // todo: implement other schemas here!
  throw new Error(`schema not supported: ${JSON.stringify(schema)}`);
}
