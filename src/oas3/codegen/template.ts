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

const templateRequestPayloadTypePath = ['core', 'core', 'requestPayload'];
export const templateRequestPayloadType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateRequestPayloadTypePath,
  createName: () => {
    return 'RequestPayload';
  },
  createGenericsDeclarationCode: () => {
    const codeParts = [
      `TRequest extends  ${templateRequestType.createName(
        templateRequestPayloadTypePath
      )} = any,`,
      'TFields extends "cookies" | "headers" | "pathParams" | "queryParams" | "contentType" | "body" = any,',
    ];
    return codeParts.join('\n');
  },
  createCode: () => {
    const fieldCodeParts = [
      'requestId?: string; // always optional',
      'headers?: TRequest["headers"]; // always optional',
      'cookies?: TRequest["cookies"]; // always optional',
      'pathParams: TRequest["pathParams"];',
      'queryParams: TRequest["queryParams"];',
      'contentType: TRequest["contentType"];',
      'body: TRequest["body"];',
    ];
    return `Pick<{${fieldCodeParts.join('\n')}}, "requestId" | TFields>`;
  },
  getRequiredOutputPaths: () => {
    return [templateRequestType.path];
  },
};

const templateRequestFromPayloadTypePath = [
  'core',
  'core',
  'requestFromPayload',
];
const templateRequestFromPayloadType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateRequestFromPayloadTypePath,
  createName: () => {
    return 'RequestFromPayload';
  },
  createGenericsDeclarationCode: () => {
    return `TPayload extends ${templateRequestPayloadType.createName(
      templateRequestFromPayloadTypePath
    )}`;
  },
  createCode: () => {
    const fieldCodeParts = [
      'TPayload["pathParams"]',
      'TPayload["queryParams"]',
      'TPayload["headers"]',
      'TPayload["cookies"]',
      'TPayload["contentType"]',
      'TPayload["body"]',
    ];
    return `${templateRequestType.createName(
      templateRequestFromPayloadTypePath
    )}<\n${fieldCodeParts.join(',\n')}\n>`;
  },
  getRequiredOutputPaths: () => {
    return [templateRequestType.path, templateRequestPayloadType.path];
  },
};

const templateCreateRequestIdFunction: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'function',
  path: ['core', 'core', 'createRequestId'],
  createName: () => {
    return 'createRequestId';
  },
  createCode: () => {
    const fieldCodeParts = [
      'const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");',
      'let requestId = "";',
      'for (let i = 32; i > 0; i--) {',
      'requestId += chars[Math.floor(Math.random() * chars.length)];',
      '}',
      'return requestId;',
    ];
    return `(): string {${fieldCodeParts.join('\n')}}`;
  },
  getRequiredOutputPaths: () => {
    return [templateRequestPayloadType.path];
  },
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
    const parts = [
      'Ct extends string | undefined = any,',
      `TBody extends ${templateRequestBodyType.createName(templateRequestTypePath)} | undefined = any,`,
      `TPathParams extends ${templatePathParamsType.createName(
        templateRequestTypePath
      )} | undefined = any,`,
      `TQueryParams extends ${templateQueryParamsType.createName(
        templateRequestTypePath
      )} | undefined = any,`,
      `THeaders extends ${templateRequestHeadersType.createName(
        templateRequestTypePath
      )} | undefined = any,`,
      `TCookies extends ${templateRequestCookiesType.createName(
        templateRequestTypePath
      )} | undefined = any,`,
    ];
    return parts.join('\n');
  },
  createCode: () => {
    const bodyCodeParts: string[] = [
      `endpointSchema: ${templateEndpointSchemaType.createName(
        templateRequestTypePath
      )};`,
      'id: string;',
      'url: string;',
      'headers: THeaders;',
      'cookies: TCookies',
      'pathParams: TPathParams',
      'queryParams: TQueryParams',
      '// According to given OAS3 specs; used as default for the "content-type" request header',
      'contentType: Ct;',
      'body: TBody;',
    ];
    return `{\n${bodyCodeParts.join('\n')}\n}`;
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

const templateRequestUnionTypePath = ['core', 'core', 'requestUnion'];
export const templateRequestUnionType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateRequestUnionTypePath,
  createName: () => {
    return 'RequestUnion';
  },
  createGenericsDeclarationCode: () => {
    const parts = [
      `TBodyData extends ${templateRequestBodyDataType.createName(
        templateRequestTypePath
      )},`,
      `TPathParams extends ${templatePathParamsType.createName(
        templateRequestTypePath
      )} | undefined = any,`,
      `TQueryParams extends ${templateQueryParamsType.createName(
        templateRequestTypePath
      )} | undefined = any,`,
      `THeaders extends ${templateRequestHeadersType.createName(
        templateRequestTypePath
      )} | undefined = any,`,
      `TCookies extends ${templateRequestCookiesType.createName(
        templateRequestTypePath
      )} | undefined = any,`,
    ];
    return parts.join('\n');
  },
  createCode: () => {
    const codeParts: string[] = [
      'TBodyData["contentType"],',
      'TBodyData["body"],',
      'TPathParams,',
      'TQueryParams,',
      'THeaders,',
      'TCookies',
    ];
    return `TBodyData extends any ? Request<${codeParts.join('\n')}> : never`;
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
  definitionType: 'interface',
  path: templateResponseTypePath,
  createName: () => {
    return 'Response';
  },
  createGenericsDeclarationCode: () => {
    const genericCodeParts: string[] = [
      'S extends number = any',
      'Ct extends string | null = any',
      `B extends ${templateResponseBodyType.createName(
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
      '// NULL if the real "content-type" response header does not match with one defined in the OAS3 specs',
      'contentType: Ct;',
      'revealBody: () => Promise<B>;',
      'revealBodyAsArrayBuffer: () => Promise<ArrayBuffer>;',
    ];
    return `{\n${bodyCodeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: () => [
    templateResponseBodyDataType.path,
    templateResponseHeadersType.path,
    templateResponseSetCookiesType.path,
  ],
};

const templateResponseUnionTypePath = ['core', 'core', 'responseUnion'];
export const templateResponseUnionType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateResponseUnionTypePath,
  createName: () => {
    return 'ResponseUnion';
  },
  createGenericsDeclarationCode: () => {
    const genericCodeParts: string[] = [
      'S extends number = any',
      `BodyData extends ${templateResponseBodyDataType.createName(
        templateResponseUnionTypePath
      )} = any`,
      `H extends ${templateResponseHeadersType.createName(
        templateResponseUnionTypePath
      )} = any`,
      `C extends ${templateResponseSetCookiesType.createName(
        templateResponseUnionTypePath
      )} = any`,
    ];
    return genericCodeParts.join(',\n');
  },
  createCode: () => {
    const responseTypeName = templateResponseType.createName(
      templateResponseUnionTypePath
    );
    const bodyCodeParts = [
      'BodyData extends any',
      `? ${responseTypeName}<S, BodyData['contentType'], BodyData['body'], H, C>`,
      ': never;',
    ];
    return `${bodyCodeParts.join('\n')}`;
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
      'undefined',
      'null',
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
    const codeParts: string[] = ['contentType: ContentType;', 'body: B;'];
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
    const codeParts: string[] = ['name: string;', 'scopes: string[];'];
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
    return '{\n[cookieName: string]: string | number;\n}';
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
  createGenericsDeclarationCode: () => {
    return `TPayload extends ${templateRequestPayloadType.createName(
      templateCreateRequestFunctionPath
    )}`;
  },
  createCode: () => {
    const argumentCodeParts = [
      `endpointSchema: ${templateEndpointSchemaType.createName(
        templateCreateRequestFunctionPath
      )}`,
      `payload?: ${templateRequestPayloadType.createName(
        templateCreateRequestFunctionPath
      )}`,
    ];
    const bodyCodeParts = [
      'const p = payload ?? {};',
      'return {',
      '...payload,',
      'id: p.requestId ?? createRequestId(),',
      'url: createRequestUrl(endpointSchema.path, p.pathParams ?? {}),',
      'contentType: p.contentType,',
      'body: p.body,',
      'pathParams: p.pathParams,',
      'queryParams: p.queryParams,',
      'headers: p.headers,',
      'cookies: p.cookies,',
      'endpointSchema: endpointSchema,',
      '}',
    ];
    return `(${argumentCodeParts.join(', ')}): ${templateRequestFromPayloadType.createName(
      templateCreateRequestFunctionPath
    )}<TPayload> {\n${bodyCodeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: () => {
    return [
      templateCreateRequestIdFunction.path,
      templateEndpointSchemaType.path,
      templateRequestPayloadType.path,
    ];
  },
};

const templateRequestBodyDataTypePath = ['core', 'core', 'requestBodyData'];
export const templateRequestBodyDataType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: templateRequestBodyDataTypePath,
  createName: () => {
    return 'RequestBodyData';
  },
  createGenericsDeclarationCode: () => {
    const parts = [
      'TContentType extends string = any,',
      `TBody extends ${templateRequestBodyType.createName(
        templateRequestBodyDataTypePath
      )} = any,`,
    ];
    return parts.join('\n');
  },
  createCode: () => {
    const parts = ['contentType: TContentType;', 'body: TBody;'];
    return `{${parts.join('\n')}}`;
  },
  getRequiredOutputPaths: () => {
    return [templateRequestBodyType.path];
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
  templateZOfZodLibrary,
  templateZodSchemaOfZodLibrary,
  templatePlainObjectType,
  templateIsPlainObjectType,
  templateFormDataObjectType,
  templateFindMatchingSchemaContentTypeFunction,
  templateEndpointSecuritySchemaType,
  templateResponseSchemaType,
  templateEndpointSchemaType,
  templatePathParamsType,
  templateQueryParamsType,
  templateRequestHeadersType,
  templateRequestCookiesType,
  templateRequestBodyType,
  templateRequestBodyDataType,
  templateRequestType,
  templateRequestUnionType,
  templateRequestPayloadType,
  templateRequestFromPayloadType,
  templateCreateRequestIdFunction,
  templateCreateRequestUrlFunction,
  templateCreateRequestFunction,
  templateResponseHeadersType,
  templateResponseSetCookiesType,
  templateResponseBodyType,
  templateResponseBodyDataType,
  templateResponseType,
  templateResponseUnionType,
  templateRequestResultType,
  templateRequestHandlerExecutionConfigType,
  templateSimpleRequestHandlerType,
  templateRequestHandlerType,
];
