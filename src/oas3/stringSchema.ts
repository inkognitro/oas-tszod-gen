import {GenericSchema} from './core';
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

export type StringSchema = GenericSchema<
  'string',
  {
    type: 'string';
    format?: string;
    enum?: string[];
    nullable?: boolean;
    minLength?: number;
    maxLength?: number;
  }
>;

export function createStringSchemaTsDefinition(): string {
  // todo: implement
}
