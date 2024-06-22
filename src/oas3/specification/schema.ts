import {ComponentRef, isComponentRef} from './componentRef';

export type ConcreteSchema =
  | BooleanSchema
  | StringSchema
  | NumberSchema
  | IntegerSchema
  | ArraySchema
  | ObjectSchema
  | OneOfSchema;

export function isConcreteSchema(
  anyValue: unknown
): anyValue is ConcreteSchema {
  return (
    isBooleanSchema(anyValue) ||
    isStringSchema(anyValue) ||
    isNumberSchema(anyValue) ||
    isIntegerSchema(anyValue) ||
    isArraySchema(anyValue) ||
    isObjectSchema(anyValue) ||
    isOneOfSchema(anyValue) ||
    isAnyOfSchema(anyValue) ||
    isAllOfSchema(anyValue)
  );
}

export type Schema = ConcreteSchema | ComponentRef;

export function isSchema(anyValue: unknown): anyValue is Schema {
  return isComponentRef(anyValue) || isConcreteSchema(anyValue);
}

export type ArraySchema = {
  type: 'array';
  nullable?: boolean;
  items: Schema;
};

export function isArraySchema(anyValue: unknown): anyValue is ArraySchema {
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

export type BooleanSchema = {
  type: 'boolean';
  nullable?: boolean;
};

export function isBooleanSchema(anyValue: unknown): anyValue is BooleanSchema {
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

export type ObjectSchema = {
  type: 'object';
  required?: string[];
  properties?: {[propName: string]: Schema};
  additionalProperties?: Schema;
};

export function isObjectSchema(anyValue: unknown): anyValue is ObjectSchema {
  const value = anyValue as ObjectSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (value.type !== 'object') {
    return false;
  }
  if (value.required !== undefined && !Array.isArray(value.required)) {
    return false;
  }
  if (value.required) {
    const invalidEntry = value.required.find(e => typeof e !== 'string');
    if (invalidEntry) {
      return false;
    }
  }
  if (
    value.properties &&
    (typeof value.properties !== 'object' || Array.isArray(value.properties))
  ) {
    return false;
  }
  if (value.properties) {
    for (const propName in value.properties) {
      const propValue = value.properties[propName];
      if (!isSchema(propValue)) {
        return false;
      }
    }
  }
  if (
    value.additionalProperties !== undefined &&
    !isSchema(value.additionalProperties)
  ) {
    return false;
  }
  return true;
}

export type StringSchema = {
  type: 'string';
  format?: string;
  enum?: string[];
  nullable?: boolean;
  minLength?: number;
  maxLength?: number;
};

export function isStringSchema(anyValue: unknown): anyValue is StringSchema {
  const value = anyValue as StringSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (value.type !== 'string') {
    return false;
  }
  if (value.format !== undefined && typeof value.format !== 'string') {
    return false;
  }
  if (value.enum !== undefined && !Array.isArray(value.enum)) {
    return false;
  }
  if (value.enum !== undefined) {
    const invalidEntry = value.enum.find(e => typeof e !== 'string');
    if (invalidEntry) {
      return false;
    }
  }
  if (value.nullable !== undefined && typeof value.nullable !== 'boolean') {
    return false;
  }
  if (value.minLength !== undefined && typeof value.minLength !== 'number') {
    return false;
  }
  if (value.maxLength !== undefined && typeof value.maxLength !== 'number') {
    return false;
  }
  return true;
}

export type AllOfMetaData = {
  description?: string;
};

function isAllOfMetaData(anyValue: unknown): anyValue is AllOfMetaData {
  const value = anyValue as AllOfMetaData;
  if (typeof value !== 'object') {
    return false;
  }
  if (
    value.description !== undefined &&
    typeof value.description !== 'string'
  ) {
    return false;
  }
  return true;
}

export type AllOfSchema = {
  allOf: (Schema | AllOfMetaData)[]; // at least one element should be a complete schema
};

export function isAllOfSchema(anyValue: unknown): anyValue is AllOfSchema {
  const value = anyValue as AllOfSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (!Array.isArray(value.allOf)) {
    return false;
  }
  let hasAtLeastOneValidSchema = false;
  for (const index in value.allOf) {
    const item = value.allOf[index];
    if (isSchema(item)) {
      hasAtLeastOneValidSchema = true;
      continue;
    }
    if (!isAllOfMetaData(item)) {
      return false;
    }
  }
  if (!hasAtLeastOneValidSchema) {
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

export function isOneOfSchema(anyValue: unknown): anyValue is OneOfSchema {
  const value = anyValue as OneOfSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (!Array.isArray(value.oneOf)) {
    return false;
  }
  if (
    value.discriminator !== undefined &&
    typeof value.discriminator.propertyName !== 'string'
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

export type AnyOfSchema = {
  anyOf: Schema[];
  discriminator?: {
    propertyName: string;
  };
};

export function isAnyOfSchema(anyValue: unknown): anyValue is AnyOfSchema {
  const value = anyValue as AnyOfSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (!Array.isArray(value.anyOf)) {
    return false;
  }
  if (
    value.discriminator !== undefined &&
    typeof value.discriminator.propertyName !== 'string'
  ) {
    return false;
  }
  const invalidEntry = value.anyOf.find(e => {
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

export type NumberSchema = {
  type: 'number';
  format?: 'string';
  nullable?: boolean;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
};

export function isNumberSchema(anyValue: unknown): anyValue is NumberSchema {
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

export type IntegerSchema = {
  type: 'integer';
  nullable?: boolean;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
};

export function isIntegerSchema(anyValue: unknown): anyValue is IntegerSchema {
  const value = anyValue as IntegerSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (value.type !== 'integer') {
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
