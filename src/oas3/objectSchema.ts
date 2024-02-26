import {GenericSchema} from './core';
import {Schema} from './schema';
export function isObjectSchema(anyValue: any): anyValue is ObjectSchema {
  const value = anyValue as ObjectSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (value.type !== 'object') {
    return false;
  }
  if (!!value.required && Array.isArray(value.required)) {
    const invalidEntry = value.required.find(e => typeof e !== 'string');
    if (invalidEntry) {
      return false;
    }
  }
  if (Array.isArray(value.required)) {
    const invalidEntry = value.required.find(e => typeof e !== 'string');
    if (invalidEntry) {
      return false;
    }
  }
  return true;
}

export type ObjectSchema = GenericSchema<
  'object',
  {
    type: 'object';
    required?: string[];
    properties: {[propName: string]: Schema};
  }
>;

export function createObjectSchemaTsDefinition(): string {
  // todo: implement
}
