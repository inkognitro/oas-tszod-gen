import {CodeGenerator, OutputType, OutputPath, DefinitionOutput} from './core';
import {Request} from '@oas3/specification';
import {applyResponseByStatusCodeMap} from './response';
import {
  templateRequestExecutionConfigType,
  templateRequestHandlerType,
  templateRequestResultType,
  templateRequestType,
} from './template';

export const responseOutputPathPart = 'response6b3a7814';
export const requestResultOutputPathPart = 'requestResult6b3a7814';

type EndpointId = {
  method: string;
  path: string;
};

function applyRequestResultTypeDefinition(
  codeGenerator: CodeGenerator,
  schema: Request,
  path: OutputPath
): DefinitionOutput {
  const responseType = applyResponseByStatusCodeMap(
    codeGenerator,
    schema.responses,
    [...path, responseOutputPathPart]
  );
  const typeDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    path,
    createCode: () => {
      const requestResultTypeName = templateRequestResultType.createName(path);
      const requestTypeName = templateRequestType.createName(path);
      const responseTypeName = responseType.createName(path);
      return `${requestResultTypeName}<${requestTypeName}, ${responseTypeName}>`;
    },
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    requiredOutputPaths: [templateRequestResultType.path, responseType.path],
  };
  codeGenerator.addOutput(typeDefinition);
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
  request: Request
) {
  const path = codeGenerator.createOperationOutputPath(request.operationId);
  const endpointIdConstDefinition = applyEndpointIdConstDefinition(
    codeGenerator,
    endpointId,
    [...path, 'endpointId']
  );
  codeGenerator.addOutput(endpointIdConstDefinition);
  const requestResultTypeDefinition = applyRequestResultTypeDefinition(
    codeGenerator,
    request,
    [...path, requestResultOutputPathPart]
  );
  codeGenerator.addOutput({
    type: OutputType.DEFINITION,
    definitionType: 'function',
    createName: referencingPath => {
      return codeGenerator.createFunctionName(path, referencingPath);
    },
    createCode: () => {
      const rrTn = requestResultTypeDefinition.createName(path);
      const cfgTn = templateRequestExecutionConfigType.createName(path);
      const rhTn = templateRequestHandlerType.createName(path);
      const bodyParts: string[] = [];
      bodyParts.push('throw new Error("implement me!");'); // todo: implement parts and remove this line
      return `(requestHandler: ${rhTn}, config?: ${cfgTn}): Promise<${rrTn}> {${bodyParts.join(
        '\n'
      )}}`;
    },
    path,
    requiredOutputPaths: [
      endpointIdConstDefinition.path,
      templateRequestType.path,
      requestResultTypeDefinition.path,
      templateRequestHandlerType.path,
      templateRequestExecutionConfigType.path,
    ],
  });
}
