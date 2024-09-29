import {OutputType, TemplateDefinitionOutput} from './core';

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
  createCode: () => {
    const bodyCodeParts: string[] = [
      'id: string;',
      'url: string;',
      `headers?: ${templateRequestHeadersType.createName(
        templateRequestTypePath
      )};`,
      `cookies?: ${templateRequestCookiesType.createName(
        templateRequestTypePath
      )};`,
      `pathParams?: ${templatePathParamsType.createName(
        templateRequestTypePath
      )};`,
      `queryParams?: ${templateQueryParamsType.createName(
        templateRequestTypePath
      )};`,
      '// according to oas3 specs; used as default for the "content-type" request header',
      'contentType: string | null;',
      `body?: ${templateRequestBodyType.createName(templateRequestTypePath)};`,
      `endpointSchema: ${templateEndpointSchemaType.createName(
        templateRequestTypePath
      )};`,
    ];
    return `{${bodyCodeParts.join('\n')}}`;
  },
  getRequiredOutputPaths: ctx => {
    const requiredOutputPaths = [
      templatePathParamsType.path,
      templateQueryParamsType.path,
      templateRequestBodyType.path,
      templateEndpointSchemaType.path,
      templateRequestHeadersType.path,
      templateRequestCookiesType.path,
      templateResponseSchemaType.path,
    ];
    if (ctx.config.withZod) {
      requiredOutputPaths.push(templateZodSchemaOfZodLibrary.path);
    }
    return requiredOutputPaths;
  },
};

const templateFormDataObjectType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'formDataObject'],
  createName: () => {
    return 'FormDataObject';
  },
  createCode: () => {
    return '{[key: string]: undefined | string | number | boolean | Blob}';
  },
  getRequiredOutputPaths: () => [],
};

const templatePlainObjectTypePath = ['core', 'core', 'plainObject'];
const templatePlainObjectType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templatePlainObjectTypePath,
  createName: () => {
    return 'PlainObject';
  },
  createCode: () => {
    const parts = [
      'null',
      '(null | boolean | number | string | PlainObject)[]',
      '{[key: string]: undefined | string | number | boolean | PlainObject}',
    ];
    return parts.join('\n|');
  },
  getRequiredOutputPaths: () => [],
};

const templateIsPlainObjectTypePath = ['core', 'core', 'isPlainObject'];
const templateIsPlainObjectType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'function',
  path: templateIsPlainObjectTypePath,
  createName: () => {
    return 'isPlainObject';
  },
  createCode: () => {
    const codeParts = [
      'if (!isSubValue) {',
      'if (value === null) {',
      'return true;',
      '}',
      "if (typeof value !== 'object') {",
      'return false;',
      '}',
      'for (const key in value) {',
      'if (!isPlainObject(value[key], true)) {',
      'return false;',
      '}',
      '}',
      'return true;',
      '}',
      "if (['string', 'boolean', 'number', 'undefined'].includes(typeof value)) {",
      'return true;',
      '}',
      "if (typeof value !== 'object') {",
      'return false;',
      '}',
      'const isArray = Array.isArray(value);',
      'for (const key in value) {',
      "if (isArray && typeof key === 'number' && value[key] === undefined) {",
      'return false;',
      '}',
      'if (!isPlainObject(value[key], true)) {',
      'return false;',
      '}',
      '}',
      'return true;',
    ];
    return `(value: any, isSubValue = false): value is ${templatePlainObjectType.createName(
      templateIsPlainObjectTypePath
    )}{\n${codeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: () => [templatePlainObjectType.path],
};

const templateResponseTypePath = ['core', 'core', 'response'];
export const templateResponseType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateResponseTypePath,
  createName: () => {
    return 'Response';
  },
  createGenericsDeclarationCode: () => {
    const genericCodeParts: string[] = [
      'S extends number = any',
      `B extends ${templateResponseBodyDataType.createName(
        templateResponseTypePath
      )} = any`,
      `H extends ${templateResponseHeadersType.createName(
        templateResponseTypePath
      )} = any`,
      `C extends ${templateResponseSetCookiesType.createName(
        templateResponseTypePath
      )} = any`,
    ];
    return genericCodeParts.join(',\n');
  },
  createCode: () => {
    const bodyCodeParts = [
      'status: S;',
      'headers: H;',
      'cookies: C;',
      'revealBodyAsArrayBuffer: () => Promise<ArrayBuffer>;',
    ];
    return `B & {\n${bodyCodeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: () => [
    templateResponseBodyDataType.path,
    templateResponseHeadersType.path,
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
      'error?: Error;',
    ];
    return `{\n${bodyCodeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: () => [],
};

const templateSimpleRequestHandlerTypePath = [
  'core',
  'core',
  'simpleRequestHandler',
];
export const templateSimpleRequestHandlerType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'interface',
  path: templateSimpleRequestHandlerTypePath,
  createName: () => {
    return 'SimpleRequestHandler';
  },
  createCode: () => {
    return `{\nexecute(request: ${templateRequestType.createName(
      templateSimpleRequestHandlerTypePath
    )}, config?: ${templateRequestHandlerExecutionConfigType.createName(
      templateSimpleRequestHandlerTypePath
    )}): Promise<${templateRequestResultType.createName(
      templateSimpleRequestHandlerTypePath
    )}>\n}`;
  },
  getRequiredOutputPaths: () => [
    templateRequestType.path,
    templateRequestHandlerExecutionConfigType.path,
    templateRequestResultType.path,
  ],
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
    return `extends ${templateSimpleRequestHandlerType.createName(
      templateRequestHandlerTypePath
    )} {\ncancelRequestById(requestId: string): void;\ncancelAllRequests(): void;\n}`;
  },
  getRequiredOutputPaths: () => [
    templateSimpleRequestHandlerType.path,
    templateRequestType.path,
    templateRequestHandlerExecutionConfigType.path,
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
      'string[]',
      'number',
      'number[]',
      'boolean',
      'boolean[]',
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
    return `Blob | FormData | ${templateFormDataObjectType.createName(
      templateRequestBodyTypePath
    )} | ${templatePlainObjectType.createName(
      templateRequestBodyTypePath
    )} | string`;
  },
  getRequiredOutputPaths: () => [
    templateFormDataObjectType.path,
    templatePlainObjectType.path,
  ],
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
    return `Blob | FormData | ${templateFormDataObjectType.createName(
      templateRequestBodyTypePath
    )} | ${templatePlainObjectType.createName(
      templateRequestBodyTypePath
    )} | string`;
  },
  codeComment: 'ArrayBuffer is ignored because it can be created from Blob',
  getRequiredOutputPaths: () => [
    templateFormDataObjectType.path,
    templatePlainObjectType.path,
  ],
};

const templateResponseBodyDataTypePath = ['core', 'core', 'responseBodyData'];
export const templateResponseBodyDataType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateResponseBodyDataTypePath,
  createName: () => {
    return 'ResponseBodyData';
  },
  createGenericsDeclarationCode: () => {
    const codeParts: string[] = [
      'ContentType extends string = any',
      'B extends ResponseBody = any',
    ];
    return `${codeParts.join(',\n')}`;
  },
  createCode: () => {
    const codeParts: string[] = [
      '// NULL if the real "content-type" response header does not match with one defined in the OAS3 specs',
      'contentType: ContentType | null;',
      'revealBody: () => Promise<B>;',
      'revealBodyAsArrayBuffer: () => Promise<ArrayBuffer>;',
    ];
    return `{\n${codeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: () => [templateResponseBodyType.path],
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
  createCode: ctx => {
    const bodyTypeCodeParts: string[] = [];
    if (ctx.config.withZod) {
      bodyTypeCodeParts.push('zodSchema: ZodSchema;');
    }
    const codeParts: string[] = [
      `bodyByContentType: Record<string, {\n${bodyTypeCodeParts.join(
        '\n'
      )}\n}>;`,
    ];
    if (ctx.config.withZod) {
      codeParts.push('headersZodSchema?: ZodSchema;');
    }
    return `{\n${codeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: ctx => {
    if (ctx.config.withZod) {
      return [templateZodSchemaOfZodLibrary.path];
    }
    return [];
  },
};

const templateEndpointSecuritySchemaType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'endpointSecuritySchema'],
  createName: () => {
    return 'EndpointSecuritySchema';
  },
  createCode: () => {
    const codeParts: string[] = [
      'name: string;',
      'requiredPermissions: string[];',
    ];
    return `{\n${codeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: ctx => {
    if (ctx.config.withZod) {
      return [templateZodSchemaOfZodLibrary.path];
    }
    return [];
  },
};

const templateEndpointSchemaTypePath = ['core', 'core', 'endpointSchema'];
export const templateEndpointSchemaType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateEndpointSchemaTypePath,
  createName: () => {
    return 'EndpointSchema';
  },
  createCode: ctx => {
    const bodyTypeCodeParts: string[] = [];
    if (ctx.config.withZod) {
      bodyTypeCodeParts.push('zodSchema: ZodSchema;');
    }
    const codeParts: string[] = [
      'path: string;',
      'method: string;',
      `supportedSecuritySchemas: ${templateEndpointSecuritySchemaType.createName(
        templateEndpointSchemaTypePath
      )}[];`,
    ];
    codeParts.push(
      `bodyByContentType: Record<string, {\n${bodyTypeCodeParts.join(
        '\n'
      )}\n}>;`
    );
    if (ctx.config.withZod) {
      codeParts.push('headersZodSchema?: ZodSchema;');
      codeParts.push('cookiesZodSchema?: ZodSchema;');
      codeParts.push('pathParamsZodSchema?: ZodSchema;');
      codeParts.push('queryParamsZodSchema?: ZodSchema;');
    }
    codeParts.push(
      `responseByStatus: Partial<Record<number | 'default', ${templateResponseSchemaType.createName(
        templateEndpointSchemaTypePath
      )}>>;`
    );
    return `{\n${codeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: ctx => {
    const outputPaths = [
      templateResponseSchemaType.path,
      templateEndpointSecuritySchemaType.path,
    ];
    if (ctx.config.withZod) {
      return [...outputPaths, templateZodSchemaOfZodLibrary.path];
    }
    return outputPaths;
  },
};

const templateRequestHeadersType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'requestHeaders'],
  createName: () => {
    return 'RequestHeaders';
  },
  createCode: () => {
    return '{\n[headerName: string]: string | number;\n}';
  },
  getRequiredOutputPaths: () => [],
};

const templateResponseHeadersType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'responseHeaders'],
  createName: () => {
    return 'ResponseHeaders';
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

export const templateRequestHandlerExecutionConfigType: TemplateDefinitionOutput =
  {
    type: OutputType.TEMPLATE_DEFINITION,
    definitionType: 'interface',
    path: ['core', 'core', 'requestHandlerExecutionConfig,'],
    createName: () => {
      return 'RequestHandlerExecutionConfig';
    },
    createCode: () => {
      return '{}';
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
  createCode: () => {
    const codeParts: string[] = [
      `headers?: ${templateRequestHeadersType.createName(
        templateRequestCreationSettingsTypePath
      )};`,
      `cookies?: ${templateRequestCookiesType.createName(
        templateRequestCreationSettingsTypePath
      )};`,
      `pathParams?: ${templatePathParamsType.createName(
        templateRequestCreationSettingsTypePath
      )};`,
      `queryParams?: ${templateQueryParamsType.createName(
        templateRequestCreationSettingsTypePath
      )};`,
      'contentType?: string;',
      `body?: ${templateRequestBodyType.createName(
        templateRequestCreationSettingsTypePath
      )};`,
      `endpointSchema: ${templateEndpointSchemaType.createName(
        templateRequestCreationSettingsTypePath
      )};`,
    ];
    return `{\n${codeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: () => [
    templateRequestHeadersType.path,
    templateRequestCookiesType.path,
    templatePathParamsType.path,
    templateQueryParamsType.path,
    templateResponseSchemaType.path,
    templateEndpointSchemaType.path,
  ],
};

const templateFindMatchingSchemaContentTypeFunctionPath = [
  'core',
  'core',
  'findMatchingSchemaContentType',
];
const templateFindMatchingSchemaContentTypeFunction: TemplateDefinitionOutput =
  {
    type: OutputType.TEMPLATE_DEFINITION,
    definitionType: 'function',
    path: templateFindMatchingSchemaContentTypeFunctionPath,
    createName: () => {
      return 'findMatchingSchemaContentType';
    },
    createCode: () => {
      const bodyCodeLines: string[] = [
        'const responseSchema = endpointSchema.responseByStatus[actualStatus] ??',
        "endpointSchema.responseByStatus['default'];",
        'if (!responseSchema) {',
        'return null;',
        '}',
        'const actualLowercaseContentType = actualContentType.toLowerCase();',
        'const schemaContentTypes = Object.keys(responseSchema.bodyByContentType);',
        'return schemaContentTypes.reduce<null | string>((currentCt, schemaCt) => {',
        'const lowercaseSchemaCt = schemaCt.toLowerCase();',
        'if (',
        '!lowercaseSchemaCt.includes(actualLowercaseContentType) &&',
        '!actualLowercaseContentType.includes(lowercaseSchemaCt)',
        ') {',
        'return currentCt;',
        '}',
        'if (!currentCt) {',
        'return schemaCt;',
        '}',
        'if (currentCt.length < schemaCt.length) {',
        'return schemaCt;',
        '}',
        'return currentCt;',
        '}, null);',
      ];
      return `(actualStatus: number, actualContentType: string, endpointSchema: ${templateEndpointSchemaType.createName(
        templateFindMatchingSchemaContentTypeFunctionPath
      )}): string | null {\n${bodyCodeLines.join('\n')}\n}`;
    },
    getRequiredOutputPaths: () => [templateEndpointSchemaType.path],
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
      '...settings',
      'id: requestId',
      `url: ${templateCreateRequestUrlFunction.createName(
        templateCreateRequestFunctionPath
      )}(settings.endpointSchema.path, settings.pathParams ?? {})`,
      'contentType: settings.contentType ?? null',
    ];
    return `(settings: ${templateRequestCreationSettingsType.createName(
      templateCreateRequestFunctionPath
    )}): ${templateRequestType.createName(
      templateCreateRequestFunctionPath
    )} {\n${requestIdParts.join('\n')}\nreturn {\n${objectCodeParts.join(
      ',\n'
    )}\n}\n}`;
  },
  getRequiredOutputPaths: ctx => {
    const requiredOutputPaths = [
      templateRequestCreationSettingsType.path,
      templateCreateRequestUrlFunction.path,
    ];
    if (ctx.config.withZod) {
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
  templateRequestHeadersType,
  templateResponseHeadersType,
  templatePathParamsType,
  templateQueryParamsType,
  templateRequestCookiesType,
  templateRequestBodyType,
  templatePlainObjectType,
  templateFormDataObjectType,
  templateIsPlainObjectType,
  templateFindMatchingSchemaContentTypeFunction,
  templateRequestCreationSettingsType,
  templateCreateRequestUrlFunction,
  templateEndpointSecuritySchemaType,
  templateEndpointSchemaType,
  templateZOfZodLibrary,
  templateZodSchemaOfZodLibrary,
  templateCreateRequestFunction,
  templateRequestType,
  templateResponseSchemaType,
  templateResponseSetCookiesType,
  templateResponseBodyType,
  templateResponseBodyDataType,
  templateResponseType,
  templateRequestResultType,
  templateRequestHandlerExecutionConfigType,
  templateSimpleRequestHandlerType,
  templateRequestHandlerType,
];
