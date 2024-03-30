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
      ...jsonResponseBodySummary.requiredOutputPaths,
    ],
  };
  codeGenerator.addOutput(typeDefinitionOutput);
  return typeDefinitionOutput;
}

export function applyResponseByStatusCodeMap(
  codeGenerator: CodeGenerator,
  schema: ResponseByStatusCodeMap,
  path: OutputPath
): DefinitionOutput {
  const statusCodeResponseOutputs: CodeGenerationOutput[] = [];
  for (const statusCode in schema) {
    const responseOutputPath: OutputPath = [...path, statusCode];
    const responseOrRef = schema[statusCode];
    if (isResponseComponentRef(responseOrRef)) {
      // todo: fix this one, because it is more a "responseBodyContentRef" than a "responseComponentRef"
      const responseOutput = applyComponentRefSchema(
        codeGenerator,
        responseOrRef,
        responseOutputPath
      );
      statusCodeResponseOutputs.push(responseOutput);
      continue;
    }
    const jsonResponseBody = responseOrRef.content['application/json'];
    if (!jsonResponseBody) {
      continue;
    }
    const statusCodeResponseType =
      applyStatusCodeResponseAndGetTypeDefinitionOutput(
        codeGenerator,
        responseOutputPath,
        parseInt(statusCode),
        jsonResponseBody
      );
    statusCodeResponseOutputs.push({
      createCode: referencingPath => {
        return statusCodeResponseType.createName(referencingPath);
      },
      path: responseOutputPath,
      requiredOutputPaths: [statusCodeResponseType.path],
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
      statusCodeResponseOutputs.forEach(responseOutput => {
        const codeComment = responseOutput.codeComment
          ? ` // ${responseOutput.codeComment}`
          : '';
        codeParts.push(`| ${responseOutput.createCode(path)}${codeComment}`);
      });
      return `${codeParts.join('\n')}`;
    },
    requiredOutputPaths: statusCodeResponseOutputs.map(o => o.path),
  };
  codeGenerator.addOutput(responseTypeDefinition);
  return responseTypeDefinition;
}
