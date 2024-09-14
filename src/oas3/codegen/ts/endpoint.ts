import {
  CodeGenerator,
  AnyDefinitionOutput,
  DefinitionOutput,
  OutputPath,
  OutputType,
} from './core';
import {
  ConcreteParameterLocation,
  ObjectSchema,
  ObjectSchemaProperties,
  Parameter,
  PermissionsBySecurityNameArray,
  Endpoint,
  findConcreteParameter,
} from '@oas3/specification';
import {
  templateCreateRequestFunction,
  templateRequestExecutionConfigType,
  templateRequestHandlerType,
  templateRequestResultType,
  templateRequestType,
} from './template';
import {GenerateConfig} from './generator';
import {applyZodSchema} from './zodSchema';
import {applyObjectSchema} from './schema';
import {applyEndpointResponse} from './endpointResponse';
import {applyNullableRequestBodyTypeDefinition} from '@oas3/codegen/ts/endpointRequest';

export const responseOutputPathPart = 'response6b3a7814';
export const requestResultOutputPathPart = 'requestResult6b3a7814';

type EndpointId = {
  method: string;
  path: string;
};

function applyRequestResult(
  codeGenerator: CodeGenerator,
  schema: Endpoint,
  path: OutputPath,
  config: GenerateConfig
): DefinitionOutput {
  const endpointResponseDefinition = applyEndpointResponse(
    codeGenerator,
    schema.responses,
    [...path, responseOutputPathPart],
    config
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
  codeGenerator.addOutput(typeDefinition, config);
  return typeDefinition;
}

function createNullableOas3ObjectSchemaFromLocationParameters(
  codeGenerator: CodeGenerator,
  requestParameters: Parameter[],
  parameterLocation: ConcreteParameterLocation
): null | ObjectSchema {
  const objectSchemaProps: ObjectSchemaProperties = {};
  const requiredObjectSchemaPropNames: string[] = [];
  let hasParametersForLocation = false;
  requestParameters.forEach(paramOrRef => {
    const p = findConcreteParameter(
      codeGenerator.getSpecification(),
      paramOrRef
    );
    if (!p) {
      throw new Error(
        `could not find concreteParameter for parameter: ${JSON.stringify(
          paramOrRef
        )}`
      );
    }
    if (p.in !== parameterLocation) {
      return;
    }
    hasParametersForLocation = true;
    objectSchemaProps[p.name] = p.schema;
    if (p.required) {
      requiredObjectSchemaPropNames.push(p.name);
    }
  }, []);
  if (!hasParametersForLocation) {
    return null;
  }
  return {
    type: 'object',
    required: requiredObjectSchemaPropNames,
    properties: objectSchemaProps,
  };
}

function createNullablePayloadOas3ObjectSchema(
  codeGenerator: CodeGenerator,
  parameterSchemas: Parameter[]
): null | ObjectSchema {
  const objectSchemaProps: ObjectSchemaProperties = {};
  const requiredObjectSchemaPropNames: string[] = [];
  let shouldAddPayload = false;

  const headersObjectSchema =
    createNullableOas3ObjectSchemaFromLocationParameters(
      codeGenerator,
      parameterSchemas ?? [],
      'header'
    );
  if (headersObjectSchema) {
    objectSchemaProps['headers'] = headersObjectSchema;
    requiredObjectSchemaPropNames.push('headers');
    shouldAddPayload = true;
  }

  const cookiesObjectSchema =
    createNullableOas3ObjectSchemaFromLocationParameters(
      codeGenerator,
      parameterSchemas ?? [],
      'cookie'
    );
  if (cookiesObjectSchema) {
    objectSchemaProps['cookies'] = cookiesObjectSchema;
    shouldAddPayload = true;
  }

  const pathParamsObjectSchema =
    createNullableOas3ObjectSchemaFromLocationParameters(
      codeGenerator,
      parameterSchemas ?? [],
      'path'
    );
  if (pathParamsObjectSchema) {
    objectSchemaProps['pathParams'] = pathParamsObjectSchema;
    requiredObjectSchemaPropNames.push('pathParams');
    shouldAddPayload = true;
  }

  const queryParamsObjectSchema =
    createNullableOas3ObjectSchemaFromLocationParameters(
      codeGenerator,
      parameterSchemas ?? [],
      'query'
    );
  if (queryParamsObjectSchema) {
    objectSchemaProps['queryParams'] = queryParamsObjectSchema;
    requiredObjectSchemaPropNames.push('queryParams');
    shouldAddPayload = true;
  }

  if (!shouldAddPayload) {
    return null;
  }

  return {
    type: 'object',
    required: requiredObjectSchemaPropNames,
    properties: objectSchemaProps,
  };
}

function applyNullablePayloadTypeDefinition(
  codeGenerator: CodeGenerator,
  schema: Endpoint,
  path: OutputPath,
  config: GenerateConfig
): null | DefinitionOutput {
  const nullableBodyTypeDefinition = schema.requestBody
    ? applyNullableRequestBodyTypeDefinition(
        codeGenerator,
        schema.requestBody,
        [...path, 'requestBody'],
        config
      )
    : null;
  const nullablePayloadOas3ObjectSchema = createNullablePayloadOas3ObjectSchema(
    codeGenerator,
    schema.parameters ?? []
  );
  if (!nullablePayloadOas3ObjectSchema && !nullableBodyTypeDefinition) {
    return null;
  }
  const payloadPropsCodeOutput = nullablePayloadOas3ObjectSchema
    ? applyObjectSchema(
        codeGenerator,
        nullablePayloadOas3ObjectSchema,
        path,
        config
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
  codeGenerator.addOutput(payloadTypeDefinition, config);
  return payloadTypeDefinition;
}

function createNullableExplicitObjectFieldsCode(
  objectSchema: ObjectSchema,
  propName: string
): null | string {
  const codeParts = [];
  if (objectSchema.properties?.[propName] && codeParts.length > 0) {
    codeParts.unshift(`...payload.${propName}`);
  }
  return codeParts.length ? `{${codeParts.join(',\n')}}` : null;
}

function createNullableSupportedSecuritySchemesCode(
  security: PermissionsBySecurityNameArray
): null | string {
  const codeParts: string[] = [];
  security.forEach(permissionsBySecurityName => {
    for (const securityName in permissionsBySecurityName) {
      const permissions = permissionsBySecurityName[securityName];
      if (!permissions.length) {
        codeParts.push(`{ name: '${securityName}', requiredPermissions: [] }`);
        continue;
      }
      const permissionsCode = `['${permissions.join(', ')}']`;
      codeParts.push(
        `{ name: '${securityName}', permissions: ${permissionsCode} }`
      );
    }
  });
  if (!codeParts.length) {
    return null;
  }
  return `[${codeParts.join(',\n')}]`;
}

function createRequestCreationCode(
  path: OutputPath,
  endpointIdDefinition: DefinitionOutput,
  payloadUtils: null | AppliedPayloadOutputs,
  security?: null | PermissionsBySecurityNameArray
): string {
  const parts: string[] = [];
  parts.push(`endpointId: ${endpointIdDefinition.createName(path)}`);
  if (!payloadUtils) {
    return `const request = createRequest({${parts.join(',\n')}});`;
  }
  parts.push('...payload');

  const explicitHeadersCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'headers'
  );
  if (explicitHeadersCode) {
    parts.push(`headers: ${explicitHeadersCode}`);
  }

  const explicitCookiesCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'cookies'
  );
  if (explicitCookiesCode) {
    // cookies should always be optional due to environment behaviour (e.g. browser set them automatically)
    parts.push(`cookies?: ${explicitCookiesCode}`);
  }

  const explicitPathParamsCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'pathParams'
  );
  if (explicitPathParamsCode) {
    parts.push(`pathParams: ${explicitPathParamsCode}`);
  }

  const explicitQueryParamsCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'queryParams'
  );
  if (explicitQueryParamsCode) {
    parts.push(`queryParams: ${explicitQueryParamsCode}`);
  }

  const explicitBodyCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'body'
  );
  if (explicitBodyCode) {
    parts.push(`body: ${explicitBodyCode}`);
  }

  if (security) {
    const securitySchemesCode =
      createNullableSupportedSecuritySchemesCode(security);
    if (securitySchemesCode) {
      parts.push(`supportedSecuritySchemes: ${securitySchemesCode}`);
    }
  }

  return `const request = createRequest({${parts.join(',\n')}});`;
}

function applyEndpointIdConstDefinition(
  codeGenerator: CodeGenerator,
  endpointId: EndpointId,
  path: OutputPath,
  config: GenerateConfig
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
    getRequiredOutputPaths: () => [],
  };
  codeGenerator.addOutput(definition, config);
  return definition;
}

export function applyEndpointCallerFunction(
  codeGenerator: CodeGenerator,
  endpointId: EndpointId,
  requestSchema: Endpoint,
  config: GenerateConfig
) {
  const path = codeGenerator.createOperationOutputPath(
    requestSchema.operationId
  );
  const endpointIdConstDefinition = applyEndpointIdConstDefinition(
    codeGenerator,
    endpointId,
    [...path, 'endpointId'],
    config
  );
  const payloadUtils = applyPayloadTypeDefinition(
    codeGenerator,
    requestSchema,
    [...path, 'payload'],
    config
  );
  const requestResultTypeDefinition = applyRequestResult(
    codeGenerator,
    requestSchema,
    [...path, requestResultOutputPathPart],
    config
  );
  const requiredOutputPaths: OutputPath[] = [
    endpointIdConstDefinition.path,
    templateRequestType.path,
    requestResultTypeDefinition.path,
    templateRequestHandlerType.path,
    templateCreateRequestFunction.path,
    templateRequestExecutionConfigType.path,
  ];
  if (payloadUtils?.typeDefinition) {
    requiredOutputPaths.push(payloadUtils?.typeDefinition.path);
  }
  codeGenerator.addOutput(
    {
      type: OutputType.DEFINITION,
      definitionType: 'function',
      createName: referencingPath => {
        return codeGenerator.createFunctionName(path, referencingPath);
      },
      createCode: () => {
        const rhTn = templateRequestHandlerType.createName(path);
        const pTn = payloadUtils?.typeDefinition?.createName(path);
        const payloadParamCode = pTn ? `, payload: ${pTn}` : '';
        const rrTn = requestResultTypeDefinition.createName(path);
        const cfgTn = templateRequestExecutionConfigType.createName(path);
        const bodyParts: string[] = [];
        bodyParts.push(
          createRequestCreationCode(
            path,
            endpointIdConstDefinition,
            payloadUtils,
            requestSchema.security
          )
        );
        bodyParts.push('return requestHandler.execute(request, config);');
        const funcBody = bodyParts.join('\n');
        return `(requestHandler: ${rhTn}${payloadParamCode}, config?: ${cfgTn}): Promise<${rrTn}> {${funcBody}}`;
      },
      path,
      getRequiredOutputPaths: () => requiredOutputPaths,
    },
    config
  );
}
