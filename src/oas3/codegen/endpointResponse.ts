import {
  CodeGenerationOutput,
  CodeGenerator,
  containsOutputPath,
  DefinitionOutput,
  OutputPath,
  OutputType,
} from './core';
import {ResponseByStatusCodeMap} from '@/oas3/specification';
import {Context} from './generator';
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
  ctx: Context
): DefinitionOutput {
  const responseOutputs: CodeGenerationOutput[] = [];
  for (const statusCodeStr in schema) {
    const statusInCode = findNumericStatusCode(statusCodeStr);
    const responseSchema = schema[statusCodeStr];
    const responseOutputPath: OutputPath = [...path, statusCodeStr];
    const responseCtx: Context = !statusInCode
      ? ctx
      : {
          ...ctx,
          response: {
            ...(ctx.response ?? {}),
            genericStatusVariableValue: `${statusInCode}`,
          },
        };
    responseOutputs.push(
      applyResponse(
        codeGenerator,
        responseSchema,
        responseOutputPath,
        responseCtx
      )
    );
  }
  const responseDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    path,
    createName: referencingPath =>
      codeGenerator.createTypeName(path, referencingPath),
    createCode: referencingPath => {
      if (!responseOutputs.length) {
        return templateResponseType.createName(referencingPath);
      }
      return responseOutputs
        .map(o => o.createCode(referencingPath))
        .join(' | ');
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
      if (responseOutputs.length) {
        return outputPaths;
      }
      return [...outputPaths, templateResponseType.path];
    },
  };
  codeGenerator.addOutput(responseDefinition, ctx);
  return responseDefinition;
}
