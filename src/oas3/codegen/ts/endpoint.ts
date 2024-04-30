import {
  CodeGenerator,
  OutputType,
  OutputPath,
  DefinitionOutput,
  getConcreteParameter,
} from './core';
import {
  ConcreteParameter,
  Request,
  RequestBodyContentByTypeMap,
  ResponseBodyContent,
  Schema,
} from '@oas3/specification';
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

function findPreferredRequestBodyContentType(
  contentByContentType?: RequestBodyContentByTypeMap
): string | null {
  if (!contentByContentType) {
    return null;
  }
  if (contentByContentType['application/json']) {
    return 'application/json';
  }
  return Object.keys(contentByContentType)[0] ?? null;
}

type TypeDefinitionWithCreateRequest = {
  createRequestCreationCode: () => string;
  payloadTypeDefinition: DefinitionOutput;
};

function applyPayloadTypeDefinitionWithCreateRequestCreationCode(
  codeGenerator: CodeGenerator,
  endpointId: EndpointId,
  request: Request,
  path: OutputPath
): TypeDefinitionWithCreateRequest {
  const concreteRequestParameters: ConcreteParameter[] =
    (request.parameters?.filter(p =>
      getConcreteParameter(p, codeGenerator)
    ) as ConcreteParameter[]) ?? [];
  const contentType = findPreferredRequestBodyContentType(
    request.requestBody?.content
  );
  const requestBodyContent = contentType
    ? request.requestBody?.content?.[contentType] ?? null
    : null;
  const requestBodyContentSchema = requestBodyContent?.schema ?? null;
  if (endpointId.method.toLowerCase() === 'get') {
    // todo: implement
  }
  const payloadTypeDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    path,
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    createCode: () => {
      return '';
    },
    requiredOutputPaths: [],
  };
  codeGenerator.addOutput(payloadTypeDefinition);
  return {payloadTypeDefinition, createRequestCreationCode: () => 'foo;'};
}

function applyEndpointIdConstDefinition(
  codeGenerator: CodeGenerator,
  endpointId: EndpointId,
  path: OutputPath
): DefinitionOutput {
  const definition: DefinitionOutput = {
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
  codeGenerator.addOutput(definition);
  return definition;
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
  const {payloadTypeDefinition, createRequestCreationCode} =
    applyPayloadTypeDefinitionWithCreateRequestCreationCode(
      codeGenerator,
      endpointId,
      request,
      [...path, 'payload']
    );
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
      const bodyParts: string[] = [
        `const request = ${createRequestCreationCode()}`,
        'return requestHandler.execute(request, config);',
      ];
      const funcBody = bodyParts.join('\n');
      return `(requestHandler: ${rhTn}, config?: ${cfgTn}): Promise<${rrTn}> {${funcBody}}`;
    },
    path,
    requiredOutputPaths: [
      endpointIdConstDefinition.path,
      payloadTypeDefinition.path,
      templateRequestType.path,
      requestResultTypeDefinition.path,
      templateRequestHandlerType.path,
      templateRequestExecutionConfigType.path,
    ],
  });
}
