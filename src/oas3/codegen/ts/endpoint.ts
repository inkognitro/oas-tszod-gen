import {
  CodeGenerator,
  DefinitionOutput,
  getConcreteParameter,
  OutputPath,
  OutputType,
} from './core';
import {
  ConcreteParameterLocation,
  ObjectSchema,
  ObjectSchemaProperties,
  Parameter,
  Request,
  RequestBodyContentByTypeMap,
  Schema,
} from '@oas3/specification';
import {applyResponseByStatusCodeMap} from './response';
import {
  templateCreateRequestFunction,
  templateRequestExecutionConfigType,
  templateRequestHandlerType,
  templateRequestResultType,
  templateRequestType,
} from './template';
import {GenerateConfig} from './generator';
import {applyZodSchema} from '@oas3/codegen/ts/zodSchema';
import {applySchema} from '@oas3/codegen/ts/schema';

export const responseOutputPathPart = 'response6b3a7814';
export const requestResultOutputPathPart = 'requestResult6b3a7814';

type EndpointId = {
  method: string;
  path: string;
};

function applyRequestResultTypeDefinition(
  codeGenerator: CodeGenerator,
  schema: Request,
  path: OutputPath,
  config: GenerateConfig
): DefinitionOutput {
  const responseType = applyResponseByStatusCodeMap(
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

function createNullableOas3ObjectSchemaFromLocationParameters(
  codeGenerator: CodeGenerator,
  requestParameters: Parameter[],
  parameterLocation: ConcreteParameterLocation
): null | ObjectSchema {
  const objectSchemaProps: ObjectSchemaProperties = {};
  const requiredObjectSchemaPropNames: string[] = [];
  let hasParametersForLocation = false;
  requestParameters.forEach(paramOrRef => {
    const p = getConcreteParameter(paramOrRef, codeGenerator);
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

function createNullableOas3ObjectSchemaForRequestPayload(
  codeGenerator: CodeGenerator,
  parameterSchemas: Parameter[],
  bodySchema: Schema | null
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
    requiredObjectSchemaPropNames.push('cookies');
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

  if (bodySchema) {
    objectSchemaProps['body'] = bodySchema;
    requiredObjectSchemaPropNames.push('body');
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

type RequestBodyContentSettings = {
  contentType: string;
  schema: null | Schema;
};

function findRequestBodyContentSettings(
  requestSchema: Request
): null | RequestBodyContentSettings {
  const contentByContentTypes = requestSchema.requestBody?.content ?? {};
  const contentType = findPreferredRequestBodyContentType(
    contentByContentTypes
  );
  if (!contentType) {
    return null;
  }
  const bodySchema = contentType
    ? contentByContentTypes[contentType] ?? null
    : null;
  const requestBodySchema = bodySchema?.schema;
  return {
    contentType,
    schema: requestBodySchema ?? null,
  };
}

type AppliedPayloadOutputs = {
  objectSchema: ObjectSchema;
  typeDefinition: DefinitionOutput;
  bodyContentType: null | string;
};

function applyPayloadIfRequired(
  codeGenerator: CodeGenerator,
  requestSchema: Request,
  path: OutputPath,
  config: GenerateConfig
): null | AppliedPayloadOutputs {
  const requestBodyContentSettings =
    findRequestBodyContentSettings(requestSchema);
  const payloadOas3ObjectSchema =
    createNullableOas3ObjectSchemaForRequestPayload(
      codeGenerator,
      requestSchema.parameters ?? [],
      requestBodyContentSettings?.schema ?? null
    );
  if (!payloadOas3ObjectSchema) {
    return null;
  }
  if (config.shouldGenerateWithZod) {
    const zodPayloadSchemaPath: OutputPath = [...path, 'zodSchema'];
    const payloadZodSchemaDefinition: DefinitionOutput = {
      type: OutputType.DEFINITION,
      createName: referencingPath =>
        codeGenerator.createConstName(zodPayloadSchemaPath, referencingPath),
      definitionType: 'const',
      ...applyZodSchema(
        codeGenerator,
        payloadOas3ObjectSchema,
        zodPayloadSchemaPath
      ),
    };
    codeGenerator.addOutput(payloadZodSchemaDefinition);
    const payloadTypeDefinition: DefinitionOutput = {
      type: OutputType.DEFINITION,
      createName: referencingPath =>
        codeGenerator.createTypeName(path, referencingPath),
      definitionType: 'type',
      path,
      requiredOutputPaths: config.shouldGenerateWithZod
        ? [payloadZodSchemaDefinition.path]
        : [],
      createCode: () => {
        return `z.infer<typeof ${codeGenerator.createConstName(
          payloadZodSchemaDefinition.path,
          path
        )}>`;
      },
    };
    codeGenerator.addOutput(payloadTypeDefinition);
    return {
      typeDefinition: payloadTypeDefinition,
      objectSchema: payloadOas3ObjectSchema,
      bodyContentType: requestBodyContentSettings?.contentType ?? null,
    };
  }
  const payloadTypeDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    createName: referencingPath =>
      codeGenerator.createTypeName(path, referencingPath),
    definitionType: 'type',
    ...applySchema(codeGenerator, payloadOas3ObjectSchema, path),
  };
  codeGenerator.addOutput(payloadTypeDefinition);
  return {
    typeDefinition: payloadTypeDefinition,
    objectSchema: payloadOas3ObjectSchema,
    bodyContentType: requestBodyContentSettings?.contentType ?? null,
  };
}

type ForcedValue = {
  name: string;
  value: string;
};

function createNullableExplicitObjectFieldsCode(
  objectSchema: ObjectSchema,
  propName: string,
  forcedValues: ForcedValue[] = []
): null | string {
  const codeParts = [];
  const forcedValuesCodeParts: string[] = forcedValues.map(v => {
    return `'${v.name.replaceAll("'", "\\'")}': '${v.value.replaceAll(
      "'",
      "\\'"
    )}'`;
  });
  if (forcedValuesCodeParts.length) {
    codeParts.push(forcedValuesCodeParts.join(',\n'));
  }
  if (objectSchema.properties?.[propName] && codeParts.length > 0) {
    codeParts.unshift(`...payload.${propName}`);
  }
  return codeParts.length ? codeParts.join(',\n') : null;
}

function createRequestCreationCode(
  path: OutputPath,
  endpointIdDefinition: DefinitionOutput,
  payloadUtils: null | AppliedPayloadOutputs
): string {
  const parts: string[] = [];
  parts.push(`endpointId: ${endpointIdDefinition.createName(path)}`);
  if (!payloadUtils) {
    return `const request = createRequest(${parts.join(',\n')});`;
  }
  parts.push('...payload');

  const forcedHeaderValues = payloadUtils.bodyContentType
    ? [{name: 'Content-Type', value: payloadUtils.bodyContentType}]
    : [];
  const explicitHeadersCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'headers',
    forcedHeaderValues
  );
  if (explicitHeadersCode) {
    parts.push(`headers: {${explicitHeadersCode}}`);
  }

  const explicitCookiesCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'cookies'
  );
  if (explicitCookiesCode) {
    parts.push(`cookies: {${explicitCookiesCode}}`);
  }

  const explicitPathParamsCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'pathParams'
  );
  if (explicitPathParamsCode) {
    parts.push(`pathParams: {${explicitPathParamsCode}}`);
  }

  const explicitQueryParamsCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'queryParams'
  );
  if (explicitQueryParamsCode) {
    parts.push(`queryParams: {${explicitQueryParamsCode}}`);
  }

  const explicitBodyCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'body'
  );
  if (explicitBodyCode) {
    parts.push(`body: {${explicitBodyCode}}`);
  }

  return `const request = createRequest({${parts.join(',\n')}});`;
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
  request: Request,
  config: GenerateConfig
) {
  const path = codeGenerator.createOperationOutputPath(request.operationId);
  const endpointIdConstDefinition = applyEndpointIdConstDefinition(
    codeGenerator,
    endpointId,
    [...path, 'endpointId']
  );
  const payloadUtils = applyPayloadIfRequired(
    codeGenerator,
    request,
    [...path, 'payload'],
    config
  );
  const requestResultTypeDefinition = applyRequestResultTypeDefinition(
    codeGenerator,
    request,
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
  codeGenerator.addOutput({
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
        createRequestCreationCode(path, endpointIdConstDefinition, payloadUtils)
      );
      bodyParts.push('return requestHandler.execute(request, config);');
      const funcBody = bodyParts.join('\n');
      return `(requestHandler: ${rhTn}${payloadParamCode}, config?: ${cfgTn}): Promise<${rrTn}> {${funcBody}}`;
    },
    path,
    requiredOutputPaths,
  });
}
