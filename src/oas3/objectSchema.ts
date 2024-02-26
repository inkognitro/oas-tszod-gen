import {isSchema, Schema} from './schema';
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

  return true;
}

export type ObjectSchema = {
  type: 'object';
  required?: string[];
  properties: {[propName: string]: Schema};
};

export function createObjectSchemaTsDefinition(): string {
  return ''; // todo: implement
}
