import {SchemaCode, SchemaCodeManager} from './core';

export function isComponentSchema(anyValue: any): anyValue is ComponentSchema {
  const value = anyValue as ComponentSchema;
  if (typeof value !== 'object') {
    return false;
  }
  if (value.$ref !== 'string') {
    return false;
  }
  return true;
}

export type ComponentSchema = {
  $ref: 'string';
};

export function createComponentSchemaCode(
  schema: ComponentSchema,
  codeManager: SchemaCodeManager
): SchemaCode {
  const componentName = schema.$ref.replace('#/components/schemas/', '');
  codeManager.addComponentSchema(componentName);
  return {
    typeScriptCode: codeManager.generateComponentTypeName(componentName),
  };
}
