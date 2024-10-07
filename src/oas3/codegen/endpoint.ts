import {
  CodeGenerator,
  Context,
  DefinitionOutput,
  endpointSchemaOutputPathPart,
  OutputPath,
  OutputType,
  requestOutputPathPart,
  requestResultOutputPathPart,
  responseOutputPathPart,
} from './core';
import {Endpoint} from '@/oas3/specification';
import {
  templateCreateRequestFunction,
  templateRequestHandlerExecutionConfigType,
  templateSimpleRequestHandlerType,
  templateRequestResultType,
  templateRequestPayloadType,
} from './template';
import {applyEndpointResponse} from './endpointResponse';
import {applyEndpointSchemaConstDefinition} from './endpointSchema';
import {
  applyRequestTypeDefinition,
  ApplyRequestTypeDefinitionResult,
} from './request';

function applyRequestResult(
  codeGenerator: CodeGenerator,
  schema: Endpoint,
  path: OutputPath,
  ctx: Context,
  requestTypeDefinition: DefinitionOutput
): DefinitionOutput {
  const responseTypeDefinition = applyEndpointResponse(
    codeGenerator,
    schema.responses,
    [...path, responseOutputPathPart],
    ctx
  );
  const typeDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    path,
    createCode: () => {
      const requestResultTypeName = templateRequestResultType.createName(path);
      const requestTypeName = requestTypeDefinition.createName(path);
      const responseTypeName = responseTypeDefinition.createName(path);
      return `${requestResultTypeName}<${requestTypeName}, ${responseTypeName}>`;
    },
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    getRequiredOutputPaths: () => [
      requestTypeDefinition.path,
      responseTypeDefinition.path,
      templateRequestResultType.path,
    ],
  };
  codeGenerator.addOutput(typeDefinition, ctx);
  return typeDefinition;
}

function createRequestCreationCode(
  path: OutputPath,
  endpointSchemaDefinition: DefinitionOutput,
  hasPayload: boolean
): string {
  const codeParts: string[] = [];
  codeParts.push(endpointSchemaDefinition.createName(path));
  if (hasPayload) {
    codeParts.push('payload');
  }
  return `${templateCreateRequestFunction.createName(path)}(${codeParts.join(',\n')})`;
}

function findPayloadParamCode(
  path: OutputPath,
  applyRequestResult: ApplyRequestTypeDefinitionResult
): null | string {
  const requiredFields = applyRequestResult.requiredPayloadFields;
  const optionalFields = applyRequestResult.optionalPayloadFields;
  if (!requiredFields.length && !optionalFields.length) {
    return null;
  }
  const requiredFieldsCode = requiredFields.length
    ? `'${requiredFields.join("' | '")}'`
    : 'never';
  const optionalFieldsCode = optionalFields.length
    ? `'${optionalFields.join("' | '")}'`
    : 'never';
  const requestPayloadTypeName = templateRequestPayloadType.createName(path);
  const requestTypeName = applyRequestResult.typeDefinition.createName(path);
  return `payload: ${requestPayloadTypeName}<${requestTypeName}, ${requiredFieldsCode}, ${optionalFieldsCode}>`;
}

export function applyEndpointCallerFunction(
  codeGenerator: CodeGenerator,
  urlPath: string,
  requestMethod: string,
  schema: Endpoint,
  ctx: Context
) {
  const localCtx: Context = {
    ...ctx,
    operationType: requestMethod.toLowerCase() === 'get' ? 'read' : 'write',
  };
  const operationId =
    schema.operationId ??
    codeGenerator.generateEndpointOperationId(requestMethod, urlPath);
  const path = codeGenerator.createOutputPathForOperationId(operationId, ctx);
  const endpointSchemaConstDefinition = applyEndpointSchemaConstDefinition(
    codeGenerator,
    urlPath,
    requestMethod,
    schema,
    [...path, endpointSchemaOutputPathPart],
    localCtx
  );
  const applyRequestTypeDefinitionResult = applyRequestTypeDefinition(
    codeGenerator,
    schema,
    [...path, requestOutputPathPart],
    localCtx
  );
  const requestTypeDefinition = applyRequestTypeDefinitionResult.typeDefinition;
  const requestResultTypeDefinition = applyRequestResult(
    codeGenerator,
    schema,
    [...path, requestResultOutputPathPart],
    localCtx,
    requestTypeDefinition
  );
  const payloadParamCode = findPayloadParamCode(
    path,
    applyRequestTypeDefinitionResult
  );
  codeGenerator.addOutput(
    {
      type: OutputType.DEFINITION,
      definitionType: 'function',
      createName: referencingPath => {
        return codeGenerator.createFunctionName(path, referencingPath);
      },
      createCode: () => {
        const paramCodeParts = [
          `requestHandler: ${templateSimpleRequestHandlerType.createName(path)}`,
        ];
        if (payloadParamCode) {
          paramCodeParts.push(payloadParamCode);
        }
        paramCodeParts.push(
          `config?: ${templateRequestHandlerExecutionConfigType.createName(path)}`
        );
        const bodyParts: string[] = [];
        const requestCreationCode = createRequestCreationCode(
          path,
          endpointSchemaConstDefinition,
          !!payloadParamCode
        );
        bodyParts.push(
          `return requestHandler.execute(${requestCreationCode}, config);`
        );
        const bodyCode = bodyParts.join('\n');
        return `(${paramCodeParts.join(', ')}): Promise<${requestResultTypeDefinition.createName(path)}> {${bodyCode}}`;
      },
      path,
      getRequiredOutputPaths: () => {
        const outputPaths: OutputPath[] = [
          endpointSchemaConstDefinition.path,
          requestTypeDefinition.path,
          requestResultTypeDefinition.path,
          templateSimpleRequestHandlerType.path,
          templateCreateRequestFunction.path,
          templateRequestHandlerExecutionConfigType.path,
        ];
        if (payloadParamCode) {
          outputPaths.push(templateRequestPayloadType.path);
        }
        return outputPaths;
      },
    },
    localCtx
  );
}
