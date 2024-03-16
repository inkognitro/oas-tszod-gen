import {
  isResponseRef,
  ResponseBodyContent,
  ResponseByStatusCodeMap,
} from '@oas3/specification';
import {
  CodeGenerationSummary,
  CodeGenerator,
  DirectOutput,
  OutputPath,
  IndirectOutputType,
  TypeDefinitionOutput,
} from './core';
import {applySchema} from './schema';
import {
  getTemplateResponseStatusCodeEnumEntry,
  templateResponse,
  templateResponseStatusCodeEnum,
} from '@oas3/codegen/ts/template';

function createResponseSummary(
  statusCode: number,
  schema: ResponseBodyContent,
  path: OutputPath,
  codeGenerator: CodeGenerator
): DirectOutput {
  const jsonResponseBodySummary = applySchema(codeGenerator, schema.schema, [
    ...path,
    'body',
  ]);
  const responseTypeDefinitionOutput: TypeDefinitionOutput = {
    type: IndirectOutputType.TYPE_DEFINITION,
    path,
    createTypeName: referencingPath => {
      return codeGenerator.createResponseTypeName(path, referencingPath);
    },
    createCode: referencingPath => {
      const responseType = templateResponse.createTypeName(path);
      const statusCodeEnum =
        templateResponseStatusCodeEnum.createTypeName(path);
      const statusCodeEnumEntry =
        getTemplateResponseStatusCodeEnumEntry(statusCode);
      const bodyCode = jsonResponseBodySummary.createCode(referencingPath);
      return `${responseType}<${statusCodeEnum}.${statusCodeEnumEntry}, ${bodyCode}>`;
    },
    requiredOutputPaths: [
      templateResponse.path,
      templateResponseStatusCodeEnum.path,
      jsonResponseBodySummary.path,
    ],
  };
  codeGenerator.addIndirectOutput(responseTypeDefinitionOutput);
}

function applyResponsesSummary(
  codeGenerator: CodeGenerator,
  schema: ResponseByStatusCodeMap,
  path: OutputPath
): DirectOutput {
  const responseTypeDefinitionOutputs: TypeDefinitionOutput[] = []; // todo: use
  const requiredOutputPaths: OutputPath[] = [];
  for (const statusCode in schema) {
    const responseOrRef = schema[statusCode];
    if (isResponseRef(responseOrRef)) {
      console.error('ResponseRef case is not supported yet'); // todo: implement
      continue;
    }
    const jsonResponseBody = responseOrRef.content['application/json'];
    if (!jsonResponseBody) {
      continue;
    }
    const responseOutputPath: OutputPath = [...path, statusCode];
    requiredOutputPaths.push(responseOutputPath);

    const jsonResponseBodySummary = applySchema(
      codeGenerator,
      jsonResponseBody.schema,
      [...responseOutputPath, 'body']
    );

    const responseTypeDefinitionOutput: TypeDefinitionOutput = {
      type: IndirectOutputType.TYPE_DEFINITION,
      path: responseOutputPath,
      createTypeName: referencingPath => {
        return codeGenerator.createResponseTypeName(
          responseOutputPath,
          referencingPath
        );
      },
      createCode: referencingPath => {
        const responseType =
          templateResponse.createTypeName(responseOutputPath);
        const statusCodeEnum =
          templateResponseStatusCodeEnum.createTypeName(responseOutputPath);
        const statusCodeEnumEntry = getTemplateResponseStatusCodeEnumEntry(
          parseInt(statusCode)
        );
        const bodyCode = jsonResponseBodySummary.createCode(referencingPath);
        return `${responseType}<${statusCodeEnum}.${statusCodeEnumEntry}, ${bodyCode}>`;
      },
      requiredOutputPaths: [
        templateResponse.path,
        templateResponseStatusCodeEnum.path,
        jsonResponseBodySummary.path,
      ],
    };
    responseTypeDefinitionOutputs.push(responseTypeDefinitionOutput);
  }
  return {
    path: path,
    createCode: referencingPath => {},
    requiredOutputPaths,
  };
}

export function applyResponseSchema(
  codeGenerator: CodeGenerator,
  schema: ResponseByStatusCodeMap,
  path: OutputPath
): CodeGenerationSummary {
  throw new Error('implement me!');
}
