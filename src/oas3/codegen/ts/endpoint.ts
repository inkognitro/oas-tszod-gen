import {
  CodeGenerationOutput,
  CodeGenerator,
  ConstDefinitionOutput,
  IndirectOutputType,
  OutputPath,
  TypeDefinitionOutput,
} from './core';
import {Request} from '@oas3/specification';
import {applyResponseByStatusCodeMap} from './response';
import {templateRequestResultType, templateRequestType} from './template';
import {EndpointId} from './template/core';

function applyRequestResultTypeDefinition(
  codeGenerator: CodeGenerator,
  schema: Request,
  path: OutputPath
): TypeDefinitionOutput {
  const responseOutput = applyResponseByStatusCodeMap(
    codeGenerator,
    schema.responses,
    [...path, 'response']
  );
  const typeDefinition: TypeDefinitionOutput = {
    type: IndirectOutputType.TYPE_DEFINITION,
    path,
    createCode: () => {
      const requestResultType = templateRequestResultType.createTypeName(path);
      const requestType = templateRequestType.createTypeName(path);
      const responseType = responseOutput.createCode(path);
      return `${requestResultType}<${requestType}, ${responseType}>`;
    },
    createTypeName: referencingPath => {
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
): ConstDefinitionOutput {
  return {
    type: IndirectOutputType.CONST_DEFINITION,
    path,
    createConstName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
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
): CodeGenerationOutput {
  const path = codeGenerator.createOutputPathByOperationId(schema.operationId);
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
  return {
    createCode: referencingPath => {
      return ''; // todo: implement
    },
    path,
    requiredOutputPaths: [
      endpointIdConstDefinition.path,
      requestResultTypeDefinition.path,
    ],
  };
}
