import {
  CodeGenerationOutput,
  CodeGenerator,
  containsOutputPath,
  DefinitionOutput,
  OutputPath,
  OutputType,
} from './core';
import {ResponseByStatusCodeMap} from '@oas3/specification';
import {GenerateConfig} from './generator';
import {applyResponse} from './response';
import {templateResponseType} from './template';

function findNumericStatusCode(statusCode: string): number | null {
  const numericStatusCode = parseInt(statusCode);
  if (isNaN(numericStatusCode)) {
    return null;
  }
  return numericStatusCode;
}

export function applyEndpointResponse(
  codeGenerator: CodeGenerator,
  schema: ResponseByStatusCodeMap,
  path: OutputPath,
  config: GenerateConfig
): DefinitionOutput {
  const responseOutputs: CodeGenerationOutput[] = [];
  for (const statusCodeStr in schema.responses) {
    const statusInCode = findNumericStatusCode(statusCodeStr) ?? 'any';
    const responseSchema = schema[statusCodeStr];
    const responseOutputPath: OutputPath = [...path, statusCodeStr];
    const responseDataOutput = applyResponse(
      codeGenerator,
      responseSchema,
      responseOutputPath,
      config
    );
    responseOutputs.push({
      path: responseOutputPath,
      createCode: () => {
        return `${templateResponseType.createName(
          responseOutputPath
        )}<${statusInCode}, ${responseDataOutput.createCode(
          responseOutputPath
        )}>`;
      },
      getRequiredOutputPaths: () => [
        ...responseDataOutput.getRequiredOutputPaths(),
        templateResponseType.path,
      ],
    });
  }
  const responseDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    path,
    createName: referencingPath =>
      codeGenerator.createTypeName(path, referencingPath),
    createCode: () => {
      if (!responseOutputs.length) {
        return templateResponseType.createName(path);
      }
      return responseOutputs.join(' | ');
    },
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
      responseOutputs.forEach(output => {
        output.getRequiredOutputPaths().forEach(outputPath => {
          if (!containsOutputPath(outputPaths, outputPath)) {
            outputPaths.push(outputPath);
          }
        });
      });
      return [...outputPaths, templateResponseType.path];
    },
  };
  codeGenerator.addOutput(responseDefinition, config);
  return responseDefinition;
}
