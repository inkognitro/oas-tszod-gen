import {
  isResponseComponentRef,
  ResponseBodyContent,
  ResponseByStatusCodeMap,
} from '@oas3/specification';
import {
  CodeGenerationOutput,
  CodeGenerator,
  OutputType,
  OutputPath,
  DefinitionOutput,
} from './core';
import {applyComponentRefSchema, applySchema} from './schema';
import {
  getTemplateResponseStatusCodeEnumEntry,
  templateResponseType,
  templateStatusCodeEnum,
} from './template';

function applyStatusCodeResponseAndGetTypeDefinitionOutput(
  codeGenerator: CodeGenerator,
  path: OutputPath,
  statusCode: number,
  schema: ResponseBodyContent
): DefinitionOutput {
  const jsonResponseBodySummary = applySchema(codeGenerator, schema.schema, [
    ...path,
    'body',
  ]);
  const typeDefinitionOutput: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    path,
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    createCode: referencingPath => {
      const responseType = templateResponseType.createName(path);
      const statusCodeEnum = templateStatusCodeEnum.createName(path);
      const statusCodeEnumEntry =
        getTemplateResponseStatusCodeEnumEntry(statusCode);
      const bodyCode = jsonResponseBodySummary.createCode(referencingPath);
      return `${responseType}<${statusCodeEnum}.${statusCodeEnumEntry},${bodyCode}>`;
    },
    requiredOutputPaths: [
      templateResponseType.path,
      templateStatusCodeEnum.path,
      jsonResponseBodySummary.path,
    ],
  };
  codeGenerator.addIndirectOutput(typeDefinitionOutput);
  return typeDefinitionOutput;
}

export function applyResponseByStatusCodeMap(
  codeGenerator: CodeGenerator,
  schema: ResponseByStatusCodeMap,
  path: OutputPath
): CodeGenerationOutput {
  const responseOutputs: CodeGenerationOutput[] = [];
  for (const statusCode in schema) {
    const responseOutputPath: OutputPath = [...path, statusCode];
    const responseOrRef = schema[statusCode];
    if (isResponseComponentRef(responseOrRef)) {
      const responseOutput = applyComponentRefSchema(
        codeGenerator,
        responseOrRef,
        responseOutputPath
      );
      responseOutputs.push(responseOutput);
      continue;
    }
    const jsonResponseBody = responseOrRef.content['application/json'];
    if (!jsonResponseBody) {
      continue;
    }
    const responseOutput = applyStatusCodeResponseAndGetTypeDefinitionOutput(
      codeGenerator,
      responseOutputPath,
      parseInt(statusCode),
      jsonResponseBody
    );
    responseOutputs.push({
      createCode: referencingPath => {
        return responseTypeDefinition.createName(referencingPath);
      },
      path: responseOutputPath,
      requiredOutputPaths: [responseOutput.path],
    });
  }
  const responseTypeDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    path,
    createCode: () => {
      const codeParts: string[] = [];
      responseOutputs.forEach(responseOutput => {
        const codeComment = responseOutput.codeComment
          ? ` // ${responseOutput.codeComment}`
          : '';
        codeParts.push(`| ${responseOutput.createCode(path)}${codeComment}`);
      });
      return `${codeParts.join('\n')}`;
    },
    requiredOutputPaths: responseOutputs.map(o => o.path),
  };
  codeGenerator.addIndirectOutput(responseTypeDefinition);
  return {
    path,
    requiredOutputPaths: [responseTypeDefinition.path],
    createCode: referencingPath => {
      return responseTypeDefinition.createName(referencingPath);
    },
  };
}
