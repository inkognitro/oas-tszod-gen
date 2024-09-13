import {
  CodeGenerator,
  DefinitionOutput,
  GeneratedDefinitionOutput,
  getConcreteParameter,
  OutputPath,
  OutputType,
} from './core';
import {
  ConcreteParameterLocation,
  isObjectSchema,
  isStringSchema,
  ObjectSchema,
  ObjectSchemaProperties,
  Parameter,
  PermissionsBySecurityNameArray,
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
import {applyObjectSchema} from '@oas3/codegen/ts/schema';

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
): GeneratedDefinitionOutput {
  const responseType = applyResponseByStatusCodeMap(
    codeGenerator,
    schema.responses,
    [...path, responseOutputPathPart],
    config
  );
  const typeDefinition: GeneratedDefinitionOutput = {
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
    getRequiredOutputPaths: () => [
      templateRequestResultType.path,
      responseType.path,
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
  const contentTypes = Object.keys(contentByContentType);
  const jsonCt = contentTypes.find(ct =>
    ct.toLowerCase().match(/application\/[^+]*[+]?(json);?.*/)
  );
  if (jsonCt) {
    return jsonCt;
  }
  const formDataCt = contentTypes.find(
    ct => ct.toLowerCase() === 'multipart/form-data'
  );
  if (formDataCt) {
    return formDataCt;
  }
  const textCt = contentTypes.find(
    ct =>
      ct.toLowerCase().startsWith('text/') ||
      ct.toLowerCase() === 'application/x-www-form-urlencoded'
  );
  if (textCt) {
    return textCt;
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

function applyNullableFormDataDefinition(
  codeGenerator: CodeGenerator,
  schema: Schema,
  path: OutputPath,
  config: GenerateConfig
): null | DefinitionOutput {
  if (!isObjectSchema(schema)) {
    return null;
  }
  const schemaProps: ObjectSchemaProperties | undefined = schema.properties;
  if (!schemaProps) {
    return null;
  }
  const stringFieldNames: string[] = [];
  const binaryFieldNames: string[] = [];
  for (const propName in schemaProps) {
    const propSchema = schemaProps[propName];
    if (isStringSchema(propSchema) && propSchema.format === 'binary') {
      binaryFieldNames.push(propName);
      continue;
    }
    stringFieldNames.push(propName);
  }
  const output: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'interface',
    path,
    createCode: () => {
      const codeParts: string[] = [];
      stringFieldNames.forEach(fieldName => {
        codeParts.push(`append(name: '${fieldName}', value: string): void;`);
      });
      binaryFieldNames.forEach(fieldName => {
        codeParts.push(
          `append(name: '${fieldName}', value: Blob, fileName?: string): void;`
        );
      });
      if (!stringFieldNames.length) {
        codeParts.push('append(name: string, value: string): void;');
      }
      if (!binaryFieldNames.length) {
        codeParts.push(
          'append(name: string, value: Blob, fileName?: string): void;'
        );
      }
      return `extends FormData {\n${codeParts.join('\n')}\n}`;
    },
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    getRequiredOutputPaths: () => {
      return [];
    },
  };
  codeGenerator.addOutput(output, config);
  return output;
}

function createOas3ObjectSchemaWithoutProperty(
  schema: ObjectSchema,
  propertyNameToRemove: string
): ObjectSchema {
  const currentProps = schema.properties;
  if (!currentProps) {
    return schema;
  }
  const nextPropNames = Object.keys(currentProps).filter(
    p => p !== propertyNameToRemove
  );
  const nextProps: ObjectSchemaProperties = {};
  nextPropNames.forEach(propName => {
    const currentProperty = currentProps[propName];
    if (currentProperty) {
      nextProps[propName] = currentProperty;
    }
  });
  return {
    ...schema,
    properties: nextProps,
    required: schema.required?.filter(p => p !== propertyNameToRemove),
  };
}

type AppliedPayloadOutputs = {
  objectSchema: ObjectSchema;
  zodSchemaDefinition?: GeneratedDefinitionOutput;
  typeDefinition: GeneratedDefinitionOutput;
  bodyContentType: null | string;
  bodyFormDataDefinition: null | DefinitionOutput;
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
  const oas3ObjectSchemaBodyProperty =
    payloadOas3ObjectSchema.properties?.['body'];
  let requestBodyFormDataDefinition: null | DefinitionOutput = null;
  if (
    oas3ObjectSchemaBodyProperty &&
    requestBodyContentSettings?.contentType.toLowerCase() ===
      'multipart/form-data'
  ) {
    requestBodyFormDataDefinition = applyNullableFormDataDefinition(
      codeGenerator,
      oas3ObjectSchemaBodyProperty,
      [...path, 'bodyFormData'],
      config
    );
  }
  let payloadZodSchemaDefinition: undefined | GeneratedDefinitionOutput =
    undefined;
  if (config.withZod) {
    const zodPayloadSchemaPath: OutputPath = [...path, 'zodSchema'];
    payloadZodSchemaDefinition = {
      type: OutputType.DEFINITION,
      createName: referencingPath =>
        codeGenerator.createConstName(zodPayloadSchemaPath, referencingPath),
      definitionType: 'const',
      ...applyZodSchema(
        codeGenerator,
        payloadOas3ObjectSchema,
        zodPayloadSchemaPath,
        config
      ),
    };
    codeGenerator.addOutput(payloadZodSchemaDefinition, config);
  }
  function createAdditionalObjectPropertyCodeRows(): string[] {
    if (requestBodyFormDataDefinition) {
      return [`body: ${requestBodyFormDataDefinition.createName(path)}`];
    }
    return [];
  }
  const preventFromAddingComponentRefs: string[] = [];
  const payloadPropsCodeOutput = applyObjectSchema(
    codeGenerator,
    requestBodyFormDataDefinition
      ? createOas3ObjectSchemaWithoutProperty(payloadOas3ObjectSchema, 'body')
      : payloadOas3ObjectSchema,
    path,
    config,
    preventFromAddingComponentRefs,
    createAdditionalObjectPropertyCodeRows
  );
  const payloadTypeDefinition: GeneratedDefinitionOutput = {
    type: OutputType.DEFINITION,
    createName: referencingPath =>
      codeGenerator.createTypeName(path, referencingPath),
    definitionType: 'type',
    path,
    createCode: payloadPropsCodeOutput.createCode,
    getRequiredOutputPaths: () => {
      const fixedOutputs = payloadPropsCodeOutput.getRequiredOutputPaths();
      if (requestBodyFormDataDefinition) {
        return [...fixedOutputs, requestBodyFormDataDefinition.path];
      }
      return fixedOutputs;
    },
  };
  codeGenerator.addOutput(payloadTypeDefinition, config);
  return {
    typeDefinition: payloadTypeDefinition,
    objectSchema: payloadOas3ObjectSchema,
    zodSchemaDefinition: payloadZodSchemaDefinition,
    bodyContentType: requestBodyContentSettings?.contentType ?? null,
    bodyFormDataDefinition: requestBodyFormDataDefinition ?? null,
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
  endpointIdDefinition: GeneratedDefinitionOutput,
  payloadUtils: null | AppliedPayloadOutputs,
  security?: null | PermissionsBySecurityNameArray
): string {
  const parts: string[] = [];
  parts.push(`endpointId: ${endpointIdDefinition.createName(path)}`);
  if (!payloadUtils) {
    return `const request = createRequest({${parts.join(',\n')}});`;
  }
  parts.push('...payload');

  const forcedHeaderValues = payloadUtils.bodyContentType
    ? [{name: 'content-type', value: payloadUtils.bodyContentType}]
    : [];
  const explicitHeadersCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'headers',
    forcedHeaderValues
  );
  if (explicitHeadersCode) {
    parts.push(`headers: ${explicitHeadersCode}`);
  }
  if (
    !!payloadUtils.objectSchema.properties?.['headers'] &&
    payloadUtils.zodSchemaDefinition
  ) {
    parts.push(
      `headersZodSchema: ${payloadUtils.zodSchemaDefinition.createName(
        path
      )}.shape.headers`
    );
  }

  const explicitCookiesCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'cookies'
  );
  if (explicitCookiesCode) {
    // cookies should always be optional due to environment behaviour (e.g. browser set them automatically)
    parts.push(`cookies?: ${explicitCookiesCode}`);
  }
  if (
    !!payloadUtils.objectSchema.properties?.['cookies'] &&
    payloadUtils.zodSchemaDefinition
  ) {
    parts.push(
      `cookiesZodSchema: ${payloadUtils.zodSchemaDefinition.createName(
        path
      )}.shape.cookies`
    );
  }

  const explicitPathParamsCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'pathParams'
  );
  if (explicitPathParamsCode) {
    parts.push(`pathParams: ${explicitPathParamsCode}`);
  }
  if (
    !!payloadUtils.objectSchema.properties?.['pathParams'] &&
    payloadUtils.zodSchemaDefinition
  ) {
    parts.push(
      `pathParamsZodSchema: ${payloadUtils.zodSchemaDefinition.createName(
        path
      )}.shape.pathParams`
    );
  }

  const explicitQueryParamsCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'queryParams'
  );
  if (explicitQueryParamsCode) {
    parts.push(`queryParams: ${explicitQueryParamsCode}`);
  }
  if (
    !!payloadUtils.objectSchema.properties?.['queryParams'] &&
    payloadUtils.zodSchemaDefinition
  ) {
    parts.push(
      `queryParamsZodSchema: ${payloadUtils.zodSchemaDefinition.createName(
        path
      )}.shape.queryParams`
    );
  }

  const explicitBodyCode = createNullableExplicitObjectFieldsCode(
    payloadUtils.objectSchema,
    'body'
  );
  if (explicitBodyCode) {
    parts.push(`body: ${explicitBodyCode}`);
  }
  if (
    !!payloadUtils.objectSchema.properties?.['body'] &&
    payloadUtils.zodSchemaDefinition
  ) {
    parts.push(
      `bodyZodSchema: ${payloadUtils.zodSchemaDefinition.createName(
        path
      )}.shape.body`
    );
  }

  if (security) {
    const securitySchemesCode =
      createNullableSupportedSecuritySchemesCode(security);
    if (securitySchemesCode) {
      parts.push(`supportedSecuritySchemes: ${securitySchemesCode}`);
    }
  }

  // todo: implement expectedResponseSchemas here

  return `const request = createRequest({${parts.join(',\n')}});`;
}

function applyEndpointIdConstDefinition(
  codeGenerator: CodeGenerator,
  endpointId: EndpointId,
  path: OutputPath,
  config: GenerateConfig
): GeneratedDefinitionOutput {
  const definition: GeneratedDefinitionOutput = {
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
  requestSchema: Request,
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
  const payloadUtils = applyPayloadIfRequired(
    codeGenerator,
    requestSchema,
    [...path, 'payload'],
    config
  );
  const requestResultTypeDefinition = applyRequestResultTypeDefinition(
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
