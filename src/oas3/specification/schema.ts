export function isSchema(anyValue: any): anyValue is Schema {
  return (
    isComponentRefSchema(anyValue) ||
    isBooleanSchema(anyValue) ||
    isStringSchema(anyValue) ||
    isNumberSchema(anyValue) ||
    isArraySchema(anyValue) ||
    isObjectSchema(anyValue) ||
    isOneOfSchema(anyValue)
  );
}

export type Schema =
  | ComponentRefSchema
  | BooleanSchema
  | StringSchema
  | NumberSchema
  | ArraySchema
  | ObjectSchema
  | OneOfSchema;

export type ComponentRefSchema = {
  $ref: 'string';
};

export function isComponentRefSchema(
  anyValue: any
): anyValue is ComponentRefSchema {
  const value = anyValue as ComponentRefSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (value.$ref !== 'string') {
    return false;
  }
  return true;
}

export type ArraySchema = {
  type: 'array';
  nullable?: boolean;
  items: Schema;
};

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

export type BooleanSchema = {
  type: 'boolean';
  nullable?: boolean;
};

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

export type ObjectSchema = {
  type: 'object';
  required?: string[];
  properties: {[propName: string]: Schema};
  additionalProperties?: Schema;
};

export function isObjectSchema(anyValue: any): anyValue is ObjectSchema {
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
    !value.properties ||
    typeof value.properties !== 'object' ||
    Array.isArray(value.properties)
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

export function isStringSchema(anyValue: any): anyValue is StringSchema {
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

export type OneOfSchema = {
  oneOf: Schema[];
  discriminator?: {
    propertyName: string;
  };
};

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

export type NumberSchema = {
  type: 'number';
  format?: 'string';
  nullable?: boolean;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
};

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
