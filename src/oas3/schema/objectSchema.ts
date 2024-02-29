import {createSchemaCode, isSchema, Schema} from './schema';
import {SchemaCode, SchemaCodeManager} from './core';

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

export type ObjectSchema = {
  type: 'object';
  required?: string[];
  properties: {[propName: string]: Schema};
  additionalProperties?: Schema;
};

export function createObjectSchemaCode(
  schema: ObjectSchema,
  codeManager: SchemaCodeManager
): SchemaCode {
  const tsRows: string[] = [];
  for (const propName in schema.properties) {
    const propSchema = schema.properties[propName];
    const propSchemaCode = createSchemaCode(propSchema, codeManager);
    const undefinableMark = !schema.required?.includes(propName) ? '?' : '';
    const propComment = propSchemaCode.codeComment
      ? ` // ${propSchemaCode.codeComment}`
      : '';
    tsRows.push(
      `${propName}${undefinableMark}: ${propSchemaCode.typeScriptCode};${propComment}`
    );
  }
  return {
    typeScriptCode: `{\n${tsRows.join('\n')}\n}`,
  };
}
