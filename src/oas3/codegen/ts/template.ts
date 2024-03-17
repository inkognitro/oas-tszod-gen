import {
  EnumDefinitionOutput,
  IndirectOutputType,
  TypeDefinitionOutput,
} from '@oas3/codegen/ts/core';

const templateOutputPathPart = 'template-5acf7fae';

const createCodeErrorMessage =
  'case not supported: code should be referenced from template folder instead';

export const templateRequestType: TypeDefinitionOutput = {
  type: IndirectOutputType.TYPE_DEFINITION,
  path: [templateOutputPathPart, 'core', 'request'],
  createTypeName: () => {
    return 'Request';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export const templateResponseType: TypeDefinitionOutput = {
  type: IndirectOutputType.TYPE_DEFINITION,
  path: [templateOutputPathPart, 'core', 'response'],
  createTypeName: () => {
    return 'Response';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export const templateStatusCodeEnum: EnumDefinitionOutput = {
  type: IndirectOutputType.ENUM_DEFINITION,
  path: [templateOutputPathPart, 'core', 'statusCode'],
  createTypeName: () => {
    return 'StatusCode';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export function getTemplateResponseStatusCodeEnumEntry(
  statusCode: number
): string {
  switch (statusCode) {
    case 200:
      return 'OK';
    case 201:
      return 'CREATED';
    case 400:
      return 'BAD_REQUEST';
    case 401:
      return 'UNAUTHORIZED';
    case 403:
      return 'FORBIDDEN';
    case 500:
      return 'SERVER_ERROR';
    default:
      throw new Error(`status code ${statusCode} not supported`);
  }
}

export const templateRequestResultType: TypeDefinitionOutput = {
  type: IndirectOutputType.TYPE_DEFINITION,
  path: [templateOutputPathPart, 'core', 'requestResult'],
  createTypeName: () => {
    return 'RequestResult';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export const templateRequestHandlerType: TypeDefinitionOutput = {
  type: IndirectOutputType.TYPE_DEFINITION,
  path: [templateOutputPathPart, 'core', 'requestHandler'],
  createTypeName: () => {
    return 'RequestHandler';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};
