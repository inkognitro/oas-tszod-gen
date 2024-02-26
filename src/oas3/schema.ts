import {isObjectSchema, ObjectSchema} from './objectSchema';
import {isStringSchema, StringSchema} from './stringSchema';

export function isSchema(anyValue: any): anyValue is Schema {
  return isStringSchema(anyValue) || isObjectSchema(anyValue); // todo: implement other schemas here!
}

export type Schema = ObjectSchema | StringSchema; // todo: implement other schemas here!
