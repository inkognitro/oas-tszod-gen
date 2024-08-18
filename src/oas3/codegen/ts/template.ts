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
  path: ['core', 'core', 'request'],
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
  path: ['core', 'core', 'response'],
  createName: () => {
    return 'Response';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export const templateRequestResultType: DefinitionOutput = {
  type: OutputType.DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'requestResult'],
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
  path: ['core', 'core', 'requestHandler'],
  createName: () => {
    return 'RequestHandler';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export const templateRequestExecutionConfigType: DefinitionOutput = {
  type: OutputType.DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'requestExecutionConfig'],
  createName: () => {
    return 'RequestExecutionConfig';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export const templateCreateRequestFunction: DefinitionOutput = {
  type: OutputType.DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'createRequest'],
  createName: () => {
    return 'createRequest';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export const templateZOfZodLibrary: DefinitionOutput = {
  type: OutputType.DEFINITION,
  definitionType: 'type',
  path: ['zod'],
  createName: () => {
    return 'z';
  },
  createCode: () => {
    throw new Error(createCodeErrorMessage);
  },
  requiredOutputPaths: [],
};

export const templateFilePaths = [
  '/core/core.ts',
  '/core/index.ts',
  '/core/security.ts',
];

const templateOutputs: Output[] = [
  templateZOfZodLibrary,
  templateRequestType,
  templateResponseType,
  templateRequestResultType,
  templateRequestHandlerType,
  templateRequestExecutionConfigType,
  templateCreateRequestFunction,
];

export function findTemplateOutput(outputPath: OutputPath): undefined | Output {
  return templateOutputs.find(o => areOutputPathsEqual(o.path, outputPath));
}
