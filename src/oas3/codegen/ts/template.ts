import {OutputType, TemplateDefinitionOutput} from '@oas3/codegen/ts/core';

const templateCreateRequestUrlFunctionPath = [
  'core',
  'core',
  'createRequestUrl',
];
const templateCreateRequestUrlFunction: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'function',
  path: templateCreateRequestUrlFunctionPath,
  createName: () => {
    return 'createRequestUrl';
  },
  createCode: () => {
    const paramsCodeParts: string[] = [
      'endpointPath: string,',
      `params: ${templatePathParamsType.createName(
        templateCreateRequestUrlFunctionPath
      )},`,
    ];
    const bodyCodeParts: string[] = [
      'const urlVariableNames = endpointPath.match(/[^{}]+(?=})/g) ?? [];',
      'let url = endpointPath;',
      'urlVariableNames.forEach(urlVariableName => {',
      'const paramPropNames = Object.keys(params);',
      'if (!paramPropNames.includes(urlVariableName)) {',
      'console.error(`url variable "${urlVariableName}" not available in params:`, params);',
      'return;',
      '}',
      'const paramValue = params[urlVariableName];',
      "if (typeof paramValue !== 'string' && typeof paramValue !== 'number') {",
      'console.error(`url variable "${urlVariableName}" must either be a string or a number, following params were given:`, params);',
      'return;',
      '}',
      'url = url.split(`{${urlVariableName}}`).join(`${paramValue}`);',
      '});',
      'return url;',
    ];
    return `(${paramsCodeParts.join('\n')}): string {${bodyCodeParts.join(
      '\n'
    )}}`;
  },
  getRequiredOutputPaths: () => [templatePathParamsType.path],
};

const templateRequestTypePath = ['core', 'core', 'request'];
export const templateRequestType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateRequestTypePath,
  createName: () => {
    return 'Request';
  },
  createGenericsDeclarationCode: () => {
    const genericCodeParts: string[] = [
      `P extends ${templatePathParamsType.createName(
        templateRequestTypePath
      )} | undefined = any`,
      `Q extends ${templateQueryParamsType.createName(
        templateRequestTypePath
      )} | undefined = any`,
      `B extends ${templateRequestBodyType.createName(
        templateRequestTypePath
      )} | undefined = any`,
    ];
    return genericCodeParts.join(',\n');
  },
  createCode: config => {
    const bodyCodeParts: string[] = [
      'id: string;',
      `endpointId: ${templateEndpointIdType.createName(
        templateRequestTypePath
      )};`,
      'url: string;',
      `supportedSecuritySchemes: ${templateSecuritySchemeType.createName(
        templateRequestTypePath
      )}[];`,
      `headers?: ${templateHeadersType.createName(templateRequestTypePath)};`,
      `cookies?: ${templateRequestCookiesType.createName(
        templateRequestTypePath
      )};`,
      'pathParams: P;',
      'queryParams: Q;',
      'contentType: string | null; // case-sensitive, according to oas3 specs; used for the "content-type" header by default',
      'body: B;',
      `schema: ${templateRequestSchemaType.createName(
        templateRequestTypePath
      )};`,
    ];
    return `{${bodyCodeParts.join('\n')}}`;
  },
  getRequiredOutputPaths: config => {
    const requiredOutputPaths = [
      templatePathParamsType.path,
      templateQueryParamsType.path,
      templateRequestBodyType.path,
      templateEndpointIdType.path,
      templateSecuritySchemeType.path,
      templateHeadersType.path,
      templateRequestCookiesType.path,
      templateResponseSchemaType.path,
      templateRequestSchemaType.path,
    ];
    if (config.withZod) {
      requiredOutputPaths.push(templateZodSchemaOfZodLibrary.path);
    }
    return requiredOutputPaths;
  },
};

const templateJsonValueType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'JsonValue'],
  createName: () => {
    return 'JsonValue';
  },
  createCode: () => {
    const validTypes = [
      'null',
      'string',
      'number',
      'boolean',
      '{[propName: string]: JsonValue}',
      'JsonValue[]',
    ];
    return `${validTypes.join('\n|')}`;
  },
  getRequiredOutputPaths: () => [],
};

const templateResponseTypePath = ['core', 'core', 'response'];
export const templateResponseType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'interface',
  path: templateResponseTypePath,
  createName: () => {
    return 'Response';
  },
  createGenericsDeclarationCode: () => {
    const genericCodeParts: string[] = [
      'S extends number = any',
      'ContentType extends string = any',
      `B extends ${templateResponseBodyType.createName(
        templateResponseTypePath
      )} = any`,
      `H extends ${templateHeadersType.createName(
        templateResponseTypePath
      )} = any`,
      `C extends ${templateResponseSetCookiesType.createName(
        templateResponseTypePath
      )} = any`,
    ];
    return genericCodeParts.join(',\n');
  },
  createCode: () => {
    return `extends ${templateResponsePayloadType.createName(
      templateResponseTypePath
    )}<ContentType, B, H, C> {\nstatus: S;\n}`;
  },
  getRequiredOutputPaths: () => [
    templateHeadersType.path,
    templateResponsePayloadType.path,
    templateResponseBodyType.path,
    templateResponseSetCookiesType.path,
  ],
};

const templateRequestResultTypePath = ['core', 'core', 'requestResult'];
export const templateRequestResultType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'interface',
  path: templateRequestResultTypePath,
  createName: () => {
    return 'RequestResult';
  },
  createGenericsDeclarationCode: () => {
    const genericCodeParts: string[] = [
      `Req extends ${templateRequestType.createName(
        templateRequestResultTypePath
      )} = any`,
      `Res extends ${templateResponseType.createName(
        templateRequestResultTypePath
      )} = any`,
    ];
    return genericCodeParts.join(',\n');
  },
  createCode: () => {
    const bodyCodeParts: string[] = [
      'request: Req;',
      'response: null | Res;',
      'hasRequestBeenCancelled: boolean;',
      'error?: Error; // must only be set when the RequestResult Promise was rejected',
    ];
    return `{\n${bodyCodeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: () => [],
};

const templateRequestHandlerTypePath = ['core', 'core', 'requestHandler'];
export const templateRequestHandlerType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'interface',
  path: templateRequestHandlerTypePath,
  createName: () => {
    return 'RequestHandler';
  },
  createCode: () => {
    return `{\nexecute(request: ${templateRequestType.createName(
      templateRequestHandlerTypePath
    )}, config?: ${templateRequestExecutionConfigType.createName(
      templateRequestHandlerTypePath
    )}): Promise<${templateRequestResultType.createName(
      templateRequestHandlerTypePath
    )}>\ncancelRequestById(requestId: string): void;\ncancelAllRequests(): void;\n}`;
  },
  getRequiredOutputPaths: () => [
    templateRequestType.path,
    templateRequestExecutionConfigType.path,
    templateRequestResultType.path,
  ],
};

const templateQueryParamsType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'queryParams'],
  createName: () => {
    return 'QueryParams';
  },
  createCode: () => {
    const propTypes: string[] = [
      'QueryParams',
      'QueryParams[]',
      'string',
      'number',
      'boolean',
    ];
    return `{\n[paramName: string]: ${propTypes.join('\n|')};\n}`;
  },
  getRequiredOutputPaths: () => [],
};

const templateRequestBodyTypePath = ['core', 'core', 'requestBody'];
const templateRequestBodyType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateRequestBodyTypePath,
  createName: () => {
    return 'RequestBody';
  },
  createCode: () => {
    return `Blob | FormData | ${templateJsonValueType.createName(
      templateRequestBodyTypePath
    )} | string`;
  },
  getRequiredOutputPaths: () => [],
};

const templateResponseBodyTypePath = ['core', 'core', 'responseBody'];
const templateResponseBodyType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateResponseBodyTypePath,
  createName: () => {
    return 'ResponseBody';
  },
  createCode: () => {
    return `Blob | FormData | ${templateJsonValueType.createName(
      templateRequestBodyTypePath
    )} | string`;
  },
  codeComment: 'ArrayBuffer is ignored because it can be created from Blob',
  getRequiredOutputPaths: () => [],
};

const templateResponsePayloadTypePath = ['core', 'core', 'responsePayload'];
export const templateResponsePayloadType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateResponsePayloadTypePath,
  createName: () => {
    return 'ResponsePayload';
  },
  createGenericsDeclarationCode: () => {
    const codeParts: string[] = [
      'ContentType extends string = any',
      'B extends ResponseBody = any',
      'H extends Headers = any',
      'C extends ResponseSetCookies = any',
    ];
    return `${codeParts.join(',\n')}`;
  },
  createCode: () => {
    const codeParts: string[] = [
      'contentType: ContentType | null; // case-sensitive, according to oas3 specs; NULL if not defined in specs',
      'headers: H;',
      'cookies: C;',
      'revealBody: () => Promise<B>;',
    ];
    return `{\n${codeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: () => [
    templateResponseBodyType.path,
    templateHeadersType.path,
    templateResponseSetCookiesType.path,
  ],
};

const templatePathParamsType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'pathParams'],
  createName: () => {
    return 'PathParams';
  },
  createCode: () => {
    return '{\n[paramName: string]: number | string;\n}';
  },
  getRequiredOutputPaths: () => [],
};

const templateResponseSchemaType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'responseSchema'],
  createName: () => {
    return 'ResponseSchema';
  },
  createCode: config => {
    const bodyVariantsCodeParts: string[] = [
      'contentType: string;' + '// case-sensitive, according to oas3 specs',
    ];
    if (config.withZod) {
      bodyVariantsCodeParts.push('zodSchema?: ZodSchema;');
    }
    const codeParts: string[] = [
      'status: number | \'any\'; // "any" is used for unexpected status codes',
      `bodyVariants: {\n${bodyVariantsCodeParts.join('\n')}\n}[];`,
    ];
    if (config.withZod) {
      codeParts.push('headersZodSchema?: ZodSchema;');
    }
    return `{\n${codeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: config => {
    if (config.withZod) {
      return [templateZodSchemaOfZodLibrary.path];
    }
    return [];
  },
};

const templateRequestSchemaTypePath = ['core', 'core', 'requestSchema'];
const templateRequestSchemaType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'requestSchema'],
  createName: () => {
    return 'RequestSchema';
  },
  createCode: config => {
    const bodyVariantsCodeParts: string[] = [
      'contentType: string;' + '// case-sensitive, according to oas3 specs',
    ];
    if (config.withZod) {
      bodyVariantsCodeParts.push('zodSchema?: ZodSchema;');
    }
    const codeParts: string[] = [
      'status: number | \'any\'; // "any" is used for unexpected status codes',
      `bodyVariants: {\n${bodyVariantsCodeParts.join('\n')}\n}[];`,
    ];
    if (config.withZod) {
      codeParts.push('headersZodSchema?: ZodSchema;');
      codeParts.push('cookiesZodSchema?: ZodSchema;');
      codeParts.push('pathParamsZodSchema?: ZodSchema;');
      codeParts.push('queryParamsZodSchema?: ZodSchema;');
    }
    codeParts.push(
      `responses: ${templateResponseSchemaType.createName(
        templateRequestSchemaTypePath
      )}[];`
    );
    return `{\n${codeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: config => {
    const outputPaths = [templateResponseSchemaType.path];
    if (config.withZod) {
      return [...outputPaths, templateZodSchemaOfZodLibrary.path];
    }
    return outputPaths;
  },
};

const templateSecuritySchemeType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'securityScheme'],
  createName: () => {
    return 'SecurityScheme';
  },
  createCode: () => {
    return '{\nname: string;\nrequiredPermissions: string[];\n}';
  },
  getRequiredOutputPaths: () => [],
};

const templateHeadersType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'headers'],
  createName: () => {
    return 'Headers';
  },
  createCode: () => {
    return '{\n[headerName: string]: string;\n}';
  },
  getRequiredOutputPaths: () => [],
};

const templateResponseSetCookiesType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'responseSetCookies'],
  createName: () => {
    return 'ResponseSetCookies';
  },
  createCode: () => {
    const codeComment =
      '// string format: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie';
    return `{\n[cookieName: string]: string; ${codeComment}\n}`;
  },
  getRequiredOutputPaths: () => [],
};

const templateRequestCookiesType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'requestCookies'],
  createName: () => {
    return 'RequestCookies';
  },
  createCode: () => {
    return '{\n[cookieName: string]: string;\n}';
  },
  getRequiredOutputPaths: () => [],
};

export const templateRequestExecutionConfigType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'interface',
  path: ['core', 'core', 'requestExecutionConfig'],
  createName: () => {
    return 'RequestExecutionConfig';
  },
  createCode: () => {
    return '{}';
  },
  getRequiredOutputPaths: () => [],
};

const templateEndpointIdType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'endpointId'],
  createName: () => {
    return 'EndpointId';
  },
  createCode: () => {
    return '{\nmethod: string;\npath: string;\n}';
  },
  getRequiredOutputPaths: () => [],
};

const templateRequestCreationSettingsTypePath = [
  'core',
  'core',
  'requestCreationSettings',
];

const templateRequestCreationSettingsType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateRequestCreationSettingsTypePath,
  createName: () => {
    return 'RequestCreationSettings';
  },
  createCode: config => {
    const codeParts: string[] = [];
    codeParts.push(
      `endpointId: ${templateEndpointIdType.createName(
        templateRequestCreationSettingsTypePath
      )};`
    );
    codeParts.push(
      `supportedSecuritySchemes?: ${templateSecuritySchemeType.createName(
        templateRequestCreationSettingsTypePath
      )}[];`
    );
    codeParts.push(
      `headers?: ${templateHeadersType.createName(
        templateRequestCreationSettingsTypePath
      )};`
    );
    codeParts.push(
      `cookies?: ${templateRequestCookiesType.createName(
        templateRequestCreationSettingsTypePath
      )};`
    );
    codeParts.push(
      `pathParams?: ${templatePathParamsType.createName(
        templateRequestCreationSettingsTypePath
      )};`
    );
    codeParts.push(
      `queryParams?: ${templateQueryParamsType.createName(
        templateRequestCreationSettingsTypePath
      )};`
    );
    codeParts.push('contentType: string | null;');
    codeParts.push(
      `body?: ${templateRequestBodyType.createName(
        templateRequestCreationSettingsTypePath
      )};`
    );
    codeParts.push(
      `schema: ${templateRequestSchemaType.createName(
        templateRequestCreationSettingsTypePath
      )};`
    );
    return `{\n${codeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: () => [
    templateEndpointIdType.path,
    templateSecuritySchemeType.path,
    templateHeadersType.path,
    templateRequestCookiesType.path,
    templatePathParamsType.path,
    templateQueryParamsType.path,
    templateResponseSchemaType.path,
    templateRequestSchemaType.path,
  ],
};

const templateCreateRequestFunctionPath = ['core', 'core', 'createRequest'];
export const templateCreateRequestFunction: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'function',
  path: templateCreateRequestFunctionPath,
  createName: () => {
    return 'createRequest';
  },
  createCode: () => {
    const requestIdParts: string[] = [
      "const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');",
      "let requestId = '';",
      'for (let i = 32; i > 0; i--) {',
      'requestId += chars[Math.floor(Math.random() * chars.length)];',
      '}',
    ];
    const objectCodeParts: string[] = [
      'id: requestId',
      'endpointId: settings.endpointId',
      'supportedSecuritySchemes: settings.supportedSecuritySchemes ?? []',
      `url: ${templateCreateRequestUrlFunction.createName(
        templateCreateRequestFunctionPath
      )}(settings.endpointId.path, settings.pathParams ?? {})`,
      'headers: settings.headers',
      'cookies: settings.cookies',
      'pathParams: settings.pathParams',
      'queryParams: settings.queryParams',
      'contentType: settings.contentType',
      'body: settings.body',
      'schema: settings.schema',
    ];
    return `(settings: ${templateRequestCreationSettingsType.createName(
      templateCreateRequestFunctionPath
    )}): ${templateRequestType.createName(
      templateCreateRequestFunctionPath
    )} {\n${requestIdParts.join('\n')}\nreturn {\n${objectCodeParts.join(
      ',\n'
    )}\n}\n}`;
  },
  getRequiredOutputPaths: config => {
    const requiredOutputPaths = [
      templateRequestCreationSettingsType.path,
      templateCreateRequestUrlFunction.path,
    ];
    if (config.withZod) {
      requiredOutputPaths.push(templateZodSchemaOfZodLibrary.path);
    }
    return requiredOutputPaths;
  },
};

export const templateZOfZodLibrary: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'const',
  fixedImportPath: 'zod',
  isExternalLibrary: true,
  path: ['zod', 'z'],
  createName: () => {
    return 'z';
  },
  getRequiredOutputPaths: () => [],
};

export const templateZodSchemaOfZodLibrary: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  fixedImportPath: 'zod',
  isExternalLibrary: true,
  path: ['z', 'zodSchema'],
  createName: () => {
    return 'ZodSchema';
  },
  getRequiredOutputPaths: () => [],
};

export const templateDefinitionOutputs: TemplateDefinitionOutput[] = [
  templateHeadersType,
  templatePathParamsType,
  templateQueryParamsType,
  templateRequestCookiesType,
  templateRequestBodyType,
  templateJsonValueType,
  templateRequestCreationSettingsType,
  templateCreateRequestUrlFunction,
  templateEndpointIdType,
  templateSecuritySchemeType,
  templateRequestSchemaType,
  templateZOfZodLibrary,
  templateZodSchemaOfZodLibrary,
  templateCreateRequestFunction,
  templateRequestType,
  templateResponseSchemaType,
  templateResponseSetCookiesType,
  templateResponseBodyType,
  templateResponsePayloadType,
  templateResponseType,
  templateRequestResultType,
  templateRequestExecutionConfigType,
  templateRequestHandlerType,
];
