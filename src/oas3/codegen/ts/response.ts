import {
  isResponseComponentRef,
  ResponseBodyContent,
  ResponseBodyContentByContentTypeMap,
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
import {templateResponseType} from './template';
import {GenerateConfig} from './generator';

function findNumericStatusCode(statusCode: string): number | null {
  const numericStatusCode = parseInt(statusCode);
  if (isNaN(numericStatusCode)) {
    return null;
  }
  return numericStatusCode;
}

function applyStatusCodeResponseAndGetTypeDefinitionOutput(
  codeGenerator: CodeGenerator,
  path: OutputPath,
  statusCode: string,
  schema: ResponseBodyContent
): DefinitionOutput {
  const requiredOutputPaths: OutputPath[] = [templateResponseType.path];
  const statusCodeDiscriminatorValue =
    findNumericStatusCode(statusCode) ?? 'any';
  const responseBodySummary = applySchema(codeGenerator, schema.schema, [
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
      const responseTypeName = templateResponseType.createName(path);
      const bodyCode = responseBodySummary.createCode(referencingPath);
      return `${responseTypeName}<${statusCodeDiscriminatorValue}, ${bodyCode}>`;
    },
    getRequiredOutputPaths: () => requiredOutputPaths,
  };
  codeGenerator.addOutput(typeDefinitionOutput);
  return typeDefinitionOutput;
}

function findPreferredResponseBodyContent(
  contentByContentType: ResponseBodyContentByContentTypeMap
): null | ResponseBodyContent {
  const jsonResponseBody = contentByContentType['application/json'];
  if (jsonResponseBody) {
    return jsonResponseBody;
  }
  return contentByContentType[Object.keys(contentByContentType)[0]] ?? null;
}

export function applyResponseByStatusCodeMap(
  codeGenerator: CodeGenerator,
  schema: ResponseByStatusCodeMap,
  path: OutputPath,
  config: GenerateConfig
): DefinitionOutput {
  const statusCodeResponseOutputs: CodeGenerationOutput[] = [];
  const requiredOutputPaths: OutputPath[] = [];
  for (const statusCode in schema) {
    const responseOutputPath: OutputPath = [...path, statusCode];
    const responseOrRef = schema[statusCode];
    if (isResponseComponentRef(responseOrRef)) {
      const responseBodyOutputPath = [...responseOutputPath, 'body'];
      if (containsOutputPath(requiredOutputPaths, responseBodyOutputPath)) {
        continue;
      }
      requiredOutputPaths.push(responseBodyOutputPath);
      const responseBodyContent = applyComponentRefSchema(
        codeGenerator,
        responseOrRef,
        responseBodyOutputPath
      );
      if (!containsOutputPath(requiredOutputPaths, templateResponseType.path)) {
        requiredOutputPaths.push(templateResponseType.path);
      }
      const statusCodeDiscriminatorValue =
        findNumericStatusCode(statusCode) ?? 'any';
      const responseOutput: CodeGenerationOutput = {
        createCode: referencingPath => {
          const responseType = templateResponseType.createName(path);
          const bodyCode = responseBodyContent.createCode(referencingPath);
          return `${responseType}<${statusCodeDiscriminatorValue}, ${bodyCode}>`;
        },
        path: responseOutputPath,
        getRequiredOutputPaths: () => [],
      };
      statusCodeResponseOutputs.push(responseOutput);
      continue;
    }
    const responseBodyContent = responseOrRef.content
      ? findPreferredResponseBodyContent(responseOrRef.content)
      : null;
    if (!responseBodyContent) {
      continue;
    }
    const statusCodeResponseType =
      applyStatusCodeResponseAndGetTypeDefinitionOutput(
        codeGenerator,
        responseOutputPath,
        statusCode,
        responseBodyContent
      );
    if (!containsOutputPath(requiredOutputPaths, statusCodeResponseType.path)) {
      requiredOutputPaths.push(statusCodeResponseType.path);
    }
    statusCodeResponseOutputs.push({
      createCode: referencingPath => {
        return statusCodeResponseType.createName(referencingPath);
      },
      path: responseOutputPath,
      getRequiredOutputPaths: () => [statusCodeResponseType.path],
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
      if (!codeParts.length) {
        return 'any';
      }
      return `${codeParts.join('\n')}`;
    },
    getRequiredOutputPaths: () => requiredOutputPaths,
  };
  codeGenerator.addOutput(responseTypeDefinition);
  return responseTypeDefinition;
}
