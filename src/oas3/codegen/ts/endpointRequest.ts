import {RequestBody} from '@oas3/specification';
import {CodeGenerator, DefinitionOutput, OutputPath, OutputType} from './core';
import {GenerateConfig} from './generator';
import {applyRequestBodyByContentTypeMap} from './request';

export function applyNullableRequestBodyTypeDefinition(
  codeGenerator: CodeGenerator,
  schema: RequestBody,
  path: OutputPath,
  config: GenerateConfig
): null | DefinitionOutput {
  if (!schema.content) {
    return null;
  }
  const definitionOutput: DefinitionOutput = {
    ...applyRequestBodyByContentTypeMap(
      codeGenerator,
      schema.content,
      path,
      config
    ),
    type: OutputType.DEFINITION,
    definitionType: 'type',
    path,
    createName: referencingPath =>
      codeGenerator.createTypeName(path, referencingPath),
  };
  codeGenerator.addOutput(definitionOutput, config);
  return definitionOutput;
}
