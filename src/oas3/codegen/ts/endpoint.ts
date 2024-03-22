import {CodeGenerator, OutputType, OutputPath, DefinitionOutput} from './core';
import {Request} from '@oas3/specification';
import {applyResponseByStatusCodeMap} from './response';
import {
  templateRequestHandlerType,
  templateRequestResultType,
  templateRequestType,
} from './template';
import {EndpointId} from './template/core';

function applyRequestResultTypeDefinition(
  codeGenerator: CodeGenerator,
  schema: Request,
  path: OutputPath
): DefinitionOutput {
  const responseOutput = applyResponseByStatusCodeMap(
    codeGenerator,
    schema.responses,
    [...path, 'response']
  );
  const typeDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    path,
    createCode: () => {
      const requestResultType = templateRequestResultType.createName(path);
      const requestType = templateRequestType.createName(path);
      const responseType = responseOutput.createCode(path);
      return `${requestResultType}<${requestType}, ${responseType}>`;
    },
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    requiredOutputPaths: [templateRequestResultType.path, responseOutput.path],
  };
  codeGenerator.addIndirectOutput(typeDefinition);
  return typeDefinition;
}

function applyEndpointIdConstDefinition(
  codeGenerator: CodeGenerator,
  endpointId: EndpointId,
  path: OutputPath
): DefinitionOutput {
  return {
    type: OutputType.DEFINITION,
    definitionType: 'const',
    path,
    createName: referencingPath => {
      return codeGenerator.createConstName(path, referencingPath);
    },
    createCode: () => {
      return `{method:'${endpointId.method}', path:'${endpointId.path}'}`;
    },
    requiredOutputPaths: [],
  };
}

export function applyEndpointCallerFunction(
  codeGenerator: CodeGenerator,
  endpointId: EndpointId,
  schema: Request
) {
  const path = codeGenerator.createOperationIdOutputPath(schema.operationId);
  const endpointIdConstDefinition = applyEndpointIdConstDefinition(
    codeGenerator,
    endpointId,
    [...path, 'endpointId']
  );
  const requestResultTypeDefinition = applyRequestResultTypeDefinition(
    codeGenerator,
    schema,
    [...path, 'requestResult']
  );
  const funcDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'function',
    createName: referencingPath => {
      return codeGenerator.createFunctionName(path, referencingPath);
    },
    createCode: () => {
      const requestResult = requestResultTypeDefinition.createName(path);
      return `(): Promise<${requestResult}> => { throw new Error('implement me!'); }`; // todo: implement
    },
    path,
    requiredOutputPaths: [
      endpointIdConstDefinition.path,
      requestResultTypeDefinition.path,
      templateRequestHandlerType.path,
    ],
  };
  codeGenerator.addIndirectOutput(funcDefinition);
}
