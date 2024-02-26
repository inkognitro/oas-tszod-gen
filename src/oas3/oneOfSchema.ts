import {isSchema, Schema} from './schema';
import {SchemaCode} from './core';
export function isOneOfSchema(anyValue: any): anyValue is OneOfSchema {
  const value = anyValue as OneOfSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (!Array.isArray(value.oneOf)) {
    return false;
  }
  let discriminatorPropName = undefined;
  if (value.discriminator !== undefined) {
    discriminatorPropName = value.discriminator;
  }
  if (
    discriminatorPropName !== undefined &&
    typeof discriminatorPropName !== 'string'
  ) {
    return false;
  }
  const invalidEntry = value.oneOf.find(e => {
    if (!isSchema(e)) {
      return true;
    }
    return false;
  });
  if (invalidEntry) {
    return false;
  }
  return true;
}

export type OneOfSchema = {
  oneOf: Schema[];
  discriminator?: {
    propertyName: string;
  };
};

function createOneOfSchemaCodeForTypescript(schema: OneOfSchema): string {
  return ''; // todo: implement
}
export function createOneOfSchemaCode(schema: OneOfSchema): SchemaCode {
  return {
    typeScriptCode: createOneOfSchemaCodeForTypescript(schema),
  };
}
