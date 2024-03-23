import {
  areOutputPathsEqual,
  DefinitionOutput,
  Output,
  OutputPath,
  OutputType,
} from '@oas3/codegen/ts/core';

const createCodeErrorMessage =
  'case not supported: code should be referenced from template folder instead';

export const templateRequestType: DefinitionOutput = {
  type: OutputType.DEFINITION,
  definitionType: 'type',
  path: ['core', 'request'],
  createName: () => {
    return 'Request';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export const templateResponseType: DefinitionOutput = {
  type: OutputType.DEFINITION,
  definitionType: 'type',
  path: ['core', 'response'],
  createName: () => {
    return 'Response';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export const templateStatusCodeEnum: DefinitionOutput = {
  type: OutputType.DEFINITION,
  definitionType: 'enum',
  path: ['core', 'statusCode'],
  createName: () => {
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

export const templateRequestResultType: DefinitionOutput = {
  type: OutputType.DEFINITION,
  definitionType: 'type',
  path: ['core', 'requestResult'],
  createName: () => {
    return 'RequestResult';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export const templateRequestHandlerType: DefinitionOutput = {
  type: OutputType.DEFINITION,
  definitionType: 'type',
  path: ['core', 'requestHandler'],
  createName: () => {
    return 'RequestHandler';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

const templateOutputs: Output[] = [
  templateRequestType,
  templateResponseType,
  templateStatusCodeEnum,
  templateRequestResultType,
  templateRequestHandlerType,
];

export function findTemplateOutput(outputPath: OutputPath): undefined | Output {
  return templateOutputs.find(o => areOutputPathsEqual(o.path, outputPath));
}
