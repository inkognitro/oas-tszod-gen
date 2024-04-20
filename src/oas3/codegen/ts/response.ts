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
  containsOutputPath,
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
  const requiredOutputPaths: OutputPath[] = [];
  for (const statusCode in schema) {
    const responseOutputPath: OutputPath = [...path, statusCode];
    const responseOrRef = schema[statusCode];
    if (isResponseComponentRef(responseOrRef)) {
      const jsonResponseBody = applyComponentRefSchema(
        codeGenerator,
        responseOrRef,
        [...responseOutputPath, 'body']
      );
      if (!containsOutputPath(requiredOutputPaths, templateResponseType.path)) {
        requiredOutputPaths.push(templateResponseType.path);
      }
      if (
        !containsOutputPath(requiredOutputPaths, templateStatusCodeEnum.path)
      ) {
        requiredOutputPaths.push(templateStatusCodeEnum.path);
      }
      if (
        !containsOutputPath(requiredOutputPaths, templateStatusCodeEnum.path)
      ) {
        requiredOutputPaths.push(jsonResponseBody.path);
      }
      const responseOutput: CodeGenerationOutput = {
        createCode: referencingPath => {
          const responseType = templateResponseType.createName(path);
          const statusCodeEnum = templateStatusCodeEnum.createName(path);
          const statusCodeEnumEntry = getTemplateResponseStatusCodeEnumEntry(
            parseInt(statusCode)
          );
          const bodyCode = jsonResponseBody.createCode(referencingPath);
          return `${responseType}<${statusCodeEnum}.${statusCodeEnumEntry}, ${bodyCode}>`;
        },
        path: responseOutputPath,
        requiredOutputPaths: [
          templateResponseType.path,
          templateStatusCodeEnum.path,
          jsonResponseBody.path,
        ],
      };
      statusCodeResponseOutputs.push(responseOutput);
      continue;
    }
    const jsonResponseBody = responseOrRef.content?.['application/json'];
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
    if (!containsOutputPath(requiredOutputPaths, statusCodeResponseType.path)) {
      requiredOutputPaths.push(statusCodeResponseType.path);
    }
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
    requiredOutputPaths,
  };
  codeGenerator.addOutput(responseTypeDefinition);
  return responseTypeDefinition;
}
