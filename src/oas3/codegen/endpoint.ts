import {CodeGenerator, DefinitionOutput, OutputPath, OutputType} from './core';
import {
  ObjectSchema,
  Endpoint,
  RequestBody,
  Parameter,
  ObjectSchemaProps,
  ConcreteParameterLocation,
  concreteParameterLocations,
} from '@/oas3/specification';
import {
  templateCreateRequestFunction,
  templateRequestHandlerExecutionConfigType,
  templateSimpleRequestHandlerType,
  templateRequestResultType,
  templateRequestType,
} from './template';
import {Context} from './generator';
import {applyObjectSchema} from './schema';
import {applyEndpointResponse} from './endpointResponse';
import {applyEndpointSchemaConstDefinition} from './endpointSchema';
import {applyRequestBodyByContentTypeMap} from './request';
import {findObjectSchemaFromLocationParameters} from './endpointPayloadUtils';

export const responseOutputPathPart = 'response6b3a7814';
export const requestResultOutputPathPart = 'requestResult6b3a7814';

function applyRequestResult(
  codeGenerator: CodeGenerator,
  schema: Endpoint,
  path: OutputPath,
  ctx: Context
): DefinitionOutput {
  const endpointResponseDefinition = applyEndpointResponse(
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
      const requestTypeName = templateRequestType.createName(path);
      const responseTypeName = endpointResponseDefinition.createName(path);
      return `${requestResultTypeName}<${requestTypeName}, ${responseTypeName}>`;
    },
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    getRequiredOutputPaths: () => [
      templateRequestResultType.path,
      endpointResponseDefinition.path,
    ],
  };
  codeGenerator.addOutput(typeDefinition, ctx);
  return typeDefinition;
}

function applyNullablePayloadTypeDefinition(
  codeGenerator: CodeGenerator,
  nullableRequestParamsObjectSchema: null | ObjectSchema,
  nullableBodyTypeDefinition: null | DefinitionOutput,
  path: OutputPath,
  ctx: Context
): null | DefinitionOutput {
  if (!nullableRequestParamsObjectSchema && !nullableBodyTypeDefinition) {
    return null;
  }
  const payloadPropsCodeOutput = nullableRequestParamsObjectSchema
    ? applyObjectSchema(
        codeGenerator,
        nullableRequestParamsObjectSchema,
        path,
        ctx
      )
    : null;
  const payloadTypeDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    createName: referencingPath =>
      codeGenerator.createTypeName(path, referencingPath),
    definitionType: 'type',
    path,
    createCode: () => {
      const codeParts = [];
      if (nullableBodyTypeDefinition) {
        codeParts.push(nullableBodyTypeDefinition.createName(path));
      }
      if (payloadPropsCodeOutput) {
        codeParts.push(payloadPropsCodeOutput.createCode(path));
      }
      return codeParts.join(' & ');
    },
    getRequiredOutputPaths: () => {
      const outputs = [
        ...(payloadPropsCodeOutput
          ? payloadPropsCodeOutput.getRequiredOutputPaths()
          : []),
      ];
      if (nullableBodyTypeDefinition) {
        outputs.push(nullableBodyTypeDefinition.path);
      }
      return outputs;
    },
  };
  codeGenerator.addOutput(payloadTypeDefinition, ctx);
  return payloadTypeDefinition;
}

function createRequestCreationCode(
  path: OutputPath,
  endpointSchemaDefinition: DefinitionOutput,
  hasPayload: boolean
): string {
  const codeParts: string[] = [];
  if (hasPayload) {
    codeParts.push('...payload');
  }
  codeParts.push(
    `endpointSchema: ${endpointSchemaDefinition.createName(path)}`
  );
  return `createRequest({${codeParts.join(',\n')}})`;
}

function applyNullableRequestBodyTypeDefinition(
  codeGenerator: CodeGenerator,
  schema: RequestBody,
  path: OutputPath,
  ctx: Context
): null | DefinitionOutput {
  if (!schema.content) {
    return null;
  }
  const definitionOutput: DefinitionOutput = {
    ...applyRequestBodyByContentTypeMap(
      codeGenerator,
      schema.content,
      path,
      ctx
    ),
    type: OutputType.DEFINITION,
    definitionType: 'type',
    path,
    createName: referencingPath =>
      codeGenerator.createTypeName(path, referencingPath),
  };
  codeGenerator.addOutput(definitionOutput, ctx);
  return definitionOutput;
}

function findRequestParamsObjectSchema(
  codeGenerator: CodeGenerator,
  parameterSchemas: Parameter[]
): null | ObjectSchema {
  const objectSchemaProps: ObjectSchemaProps = {};
  const requiredObjectSchemaPropNames: string[] = [];
  let hasAnyParams = false;
  const payloadPropNameByParamLocation: {
    [key in ConcreteParameterLocation]: string;
  } = {
    header: 'headers',
    cookie: 'cookies',
    path: 'pathParams',
    query: 'queryParams',
  };
  concreteParameterLocations.forEach(paramLocation => {
    const objectSchema = findObjectSchemaFromLocationParameters(
      codeGenerator,
      parameterSchemas ?? [],
      paramLocation
    );
    if (!objectSchema) {
      return;
    }
    hasAnyParams = true;
    const propName = payloadPropNameByParamLocation[paramLocation];
    objectSchemaProps[propName] = objectSchema;
    if (propName !== 'cookies') {
      requiredObjectSchemaPropNames.push(propName);
    }
  });
  return !hasAnyParams
    ? null
    : {
        type: 'object',
        required: requiredObjectSchemaPropNames,
        properties: objectSchemaProps,
      };
}

export function applyEndpointCallerFunction(
  codeGenerator: CodeGenerator,
  urlPath: string,
  requestMethod: string,
  schema: Endpoint,
  ctx: Context
) {
  if (!schema.operationId && ctx.config.ignoreEndpointsWithoutOperationId) {
    return;
  }
  const localCtx: Context = {
    ...ctx,
    operationType: requestMethod.toLowerCase() === 'get' ? 'read' : 'write',
  };
  const operationId =
    schema.operationId ??
    codeGenerator.generateEndpointOperationId(requestMethod, urlPath);
  const path = codeGenerator.createOperationOutputPath(operationId);
  const endpointSchemaConstDefinition = applyEndpointSchemaConstDefinition(
    codeGenerator,
    urlPath,
    requestMethod,
    schema,
    [...path, 'endpointSchema'],
    localCtx
  );
  const requestParamsObjectSchema = findRequestParamsObjectSchema(
    codeGenerator,
    schema.parameters ?? []
  );
  const requestBodyTypeDefinition = schema.requestBody
    ? applyNullableRequestBodyTypeDefinition(
        codeGenerator,
        schema.requestBody,
        [...path, 'requestBody'],
        localCtx
      )
    : null;
  const payloadTypeDefinition = applyNullablePayloadTypeDefinition(
    codeGenerator,
    requestParamsObjectSchema,
    requestBodyTypeDefinition,
    [...path, 'payload'],
    localCtx
  );
  const requestResultTypeDefinition = applyRequestResult(
    codeGenerator,
    schema,
    [...path, requestResultOutputPathPart],
    localCtx
  );
  codeGenerator.addOutput(
    {
      type: OutputType.DEFINITION,
      definitionType: 'function',
      createName: referencingPath => {
        return codeGenerator.createFunctionName(path, referencingPath);
      },
      createCode: () => {
        const rhTn = templateSimpleRequestHandlerType.createName(path);
        const pTn = payloadTypeDefinition?.createName(path);
        const payloadParamCode = pTn ? `, payload: ${pTn}` : '';
        const rrTn = requestResultTypeDefinition.createName(path);
        const cfgTn =
          templateRequestHandlerExecutionConfigType.createName(path);
        const bodyParts: string[] = [];
        const requestCreationCode = createRequestCreationCode(
          path,
          endpointSchemaConstDefinition,
          !!payloadTypeDefinition
        );
        bodyParts.push(
          `return requestHandler.execute(${requestCreationCode}, config);`
        );
        const funcBody = bodyParts.join('\n');
        return `(requestHandler: ${rhTn}${payloadParamCode}, config?: ${cfgTn}): Promise<${rrTn}> {${funcBody}}`;
      },
      path,
      getRequiredOutputPaths: () => {
        const outputPaths: OutputPath[] = [
          endpointSchemaConstDefinition.path,
          templateRequestType.path,
          requestResultTypeDefinition.path,
          templateSimpleRequestHandlerType.path,
          templateCreateRequestFunction.path,
          templateRequestHandlerExecutionConfigType.path,
        ];
        if (payloadTypeDefinition) {
          outputPaths.push(payloadTypeDefinition.path);
        }
        return outputPaths;
      },
    },
    localCtx
  );
}
