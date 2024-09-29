import {
  AnyDefinitionOutput,
  CodeGenerator,
  DefinitionOutput,
  OutputPath,
  OutputType,
} from './core';
import {isObjectSchema, isStringSchema, Schema} from '@/oas3/specification';
import {Context} from './generator';

export function applyNullableFormDataTypeDefinition(
  codeGenerator: CodeGenerator,
  schema: Schema,
  path: OutputPath,
  ctx: Context
): DefinitionOutput | null {
  if (!isObjectSchema(schema)) {
    return null;
  }
  const schemaProps = schema.properties;
  if (!schemaProps) {
    return null;
  }
  const stringFieldNames: string[] = [];
  const binaryFieldNames: string[] = [];
  for (const propName in schemaProps) {
    const propSchema = schemaProps[propName];
    if (isStringSchema(propSchema) && propSchema.format === 'binary') {
      binaryFieldNames.push(propName);
      continue;
    }
    stringFieldNames.push(propName);
  }
  const output: AnyDefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'interface',
    path,
    createCode: () => {
      const codeParts: string[] = [];
      stringFieldNames.forEach(fieldName => {
        codeParts.push(`append(name: '${fieldName}', value: string): void;`);
      });
      binaryFieldNames.forEach(fieldName => {
        codeParts.push(
          `append(name: '${fieldName}', value: Blob, fileName?: string): void;`
        );
      });
      if (!stringFieldNames.length) {
        codeParts.push('append(name: string, value: string): void;');
      }
      if (!binaryFieldNames.length) {
        codeParts.push(
          'append(name: string, value: Blob, fileName?: string): void;'
        );
      }
      return `extends FormData {\n${codeParts.join('\n')}\n}`;
    },
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    getRequiredOutputPaths: () => {
      return [];
    },
  };
  codeGenerator.addOutput(output, ctx);
  return output;
}
