import {
  isComponentRef,
  ResponseBodyContent,
  ResponseByStatusCodeMap,
} from '@oas3/specification';
import {
  CodeGenerator,
  CodeGenerationOutput,
  OutputPath,
  IndirectOutputType,
  TypeDefinitionOutput,
} from './core';
import {applySchema} from './schema';
import {
  getTemplateResponseStatusCodeEnumEntry,
  templateResponseType,
  templateStatusCodeEnum,
} from '@oas3/codegen/ts/template';

function applyStatusCodeResponseAndGetTypeDefinitionOutput(
  codeGenerator: CodeGenerator,
  path: OutputPath,
  statusCode: number,
  schema: ResponseBodyContent
): TypeDefinitionOutput {
  const jsonResponseBodySummary = applySchema(codeGenerator, schema.schema, [
    ...path,
    'body',
  ]);
  return {
    type: IndirectOutputType.TYPE_DEFINITION,
    path,
    createTypeName: referencingPath => {
      return codeGenerator.createResponseTypeName(path, referencingPath);
    },
    createCode: referencingPath => {
      const responseType = templateResponseType.createTypeName(path);
      const statusCodeEnum = templateStatusCodeEnum.createTypeName(path);
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
}

export function applyResponseByStatusCodeMap(
  codeGenerator: CodeGenerator,
  schema: ResponseByStatusCodeMap,
  path: OutputPath
): CodeGenerationOutput {
  const responseTypeDefinitionOutputs: TypeDefinitionOutput[] = []; // todo: use
  const requiredOutputPaths: OutputPath[] = [];
  for (const statusCode in schema) {
    const responseOrRef = schema[statusCode];
    if (isComponentRef(responseOrRef)) {
      console.error('ResponseRef case is not supported yet'); // todo: implement
      continue;
    }
    const jsonResponseBody = responseOrRef.content['application/json'];
    if (!jsonResponseBody) {
      continue;
    }
    const responseOutputPath: OutputPath = [...path, statusCode];
    requiredOutputPaths.push(responseOutputPath);
    const responseTypeDefinitionOutput =
      applyStatusCodeResponseAndGetTypeDefinitionOutput(
        codeGenerator,
        responseOutputPath,
        parseInt(statusCode),
        jsonResponseBody
      );
    responseTypeDefinitionOutputs.push(responseTypeDefinitionOutput);
  }
  return {
    path: path,
    createCode: referencingPath => {},
    requiredOutputPaths,
  };
}
