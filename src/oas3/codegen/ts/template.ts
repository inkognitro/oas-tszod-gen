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
      'Q extends object | undefined = any',
      'B extends object | undefined = any',
    ];
    return genericCodeParts.join(',\n');
  },
  createCode: () => {
    const bodyCodeParts: string[] = [
      `endpointId: ${templateEndpointIdType.createName(
        templateRequestTypePath
      )};`,
      'url: string;',
      `supportedSecuritySchemes: ${templateSecuritySchemeType.createName(
        templateRequestTypePath
      )}[];`,
      `headers?: ${templateHeadersType.createName(templateRequestTypePath)};`,
      `cookies?: ${templateCookiesType.createName(templateRequestTypePath)};`,
      'pathParams: P;',
      'queryParams: Q;',
      'body: B;',
    ];
    return `{${bodyCodeParts.join('\n')}}`;
  },
  getRequiredOutputPaths: () => [
    templatePathParamsType.path,
    templateEndpointIdType.path,
    templateSecuritySchemeType.path,
    templateHeadersType.path,
    templateCookiesType.path,
  ],
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
      `S extends ${templateStatusCodeType.createName(
        templateResponseTypePath
      )} = any`,
      'B = any',
      `H extends ${templateHeadersType.createName(
        templateResponseTypePath
      )} = {}`,
      `C extends ${templateCookiesType.createName(
        templateResponseTypePath
      )} = {}`,
    ];
    return genericCodeParts.join(',\n');
  },
  createCode: () => {
    const bodyCodeParts: string[] = [
      'statusCode: S;',
      'headers: H;',
      'cookies: C;',
      'body: B;',
    ];
    return `{${bodyCodeParts.join('\n')}}`;
  },
  getRequiredOutputPaths: () => [
    templateStatusCodeType.path,
    templateHeadersType.path,
    templateCookiesType.path,
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
    ];
    return `{${bodyCodeParts.join('\n')}}`;
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
    )}>\n}`;
  },
  getRequiredOutputPaths: () => [
    templateRequestType.path,
    templateRequestExecutionConfigType.path,
    templateRequestResultType.path,
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

const templateStatusCodeType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'statusCode'],
  createName: () => {
    return 'StatusCode';
  },
  createCode: () => {
    const codeComment =
      'This is not "any" of TypeScript, it\'s a string placeholder for unspecified status codes';
    return `number | 'any'; // ${codeComment}`;
  },
  getRequiredOutputPaths: () => [],
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
    return "{\n[key: 'Content-Type' | string]: string;\n}";
  },
  getRequiredOutputPaths: () => [],
};

const templateCookiesType: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'type',
  path: ['core', 'core', 'cookies'],
  createName: () => {
    return 'Cookies';
  },
  createCode: () => {
    return '{\n[key: string]: string;\n}';
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
  createCode: () => {
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
      `cookies?: ${templateCookiesType.createName(
        templateRequestCreationSettingsTypePath
      )};`
    );
    codeParts.push(
      `pathParams?: ${templatePathParamsType.createName(
        templateRequestCreationSettingsTypePath
      )};`
    );
    codeParts.push('queryParams?: object;');
    codeParts.push('body?: object;');
    return `{\n${codeParts.join('\n')}\n}`;
  },
  getRequiredOutputPaths: () => [
    templateEndpointIdType.path,
    templateSecuritySchemeType.path,
    templateHeadersType.path,
    templateCookiesType.path,
    templatePathParamsType.path,
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
    const objectCodeParts: string[] = [];
    objectCodeParts.push('endpointId: settings.endpointId');
    objectCodeParts.push(
      'supportedSecuritySchemes: settings.supportedSecuritySchemes ?? []'
    );
    objectCodeParts.push(
      `url: ${templateCreateRequestUrlFunction.createName(
        templateCreateRequestFunctionPath
      )}(settings.endpointId.path, settings.pathParams ?? {})`
    );
    objectCodeParts.push('headers: settings.headers');
    objectCodeParts.push('cookies: settings.cookies');
    objectCodeParts.push('pathParams: settings.pathParams');
    objectCodeParts.push('queryParams: settings.queryParams');
    objectCodeParts.push('body: settings.body');
    const objectCode = `{\n${objectCodeParts.join(',\n')}\n}`;
    return `(settings: ${templateRequestCreationSettingsType.createName(
      templateCreateRequestFunctionPath
    )}): ${templateRequestType.createName(
      templateCreateRequestFunctionPath
    )} {\nreturn ${objectCode}\n}`;
  },
  getRequiredOutputPaths: () => [
    templateRequestCreationSettingsType.path,
    templateCreateRequestUrlFunction.path,
  ],
};

export const templateZOfZodLibrary: TemplateDefinitionOutput = {
  type: OutputType.TEMPLATE_DEFINITION,
  definitionType: 'const',
  fixedImportPath: 'zod',
  path: ['zod'],
  createName: () => {
    return 'z';
  },
  getRequiredOutputPaths: () => [],
};

export const templateFilesToIgnore = ['/core/core.ts'];

export const templateDefinitionOutputs: TemplateDefinitionOutput[] = [
  templatePathParamsType,
  templateStatusCodeType,
  templateSecuritySchemeType,
  templateHeadersType,
  templateCookiesType,
  templateEndpointIdType,
  templateRequestCreationSettingsType,
  templateCreateRequestUrlFunction,
  templateZOfZodLibrary,
  templateCreateRequestFunction,
  templateRequestType,
  templateResponseType,
  templateRequestResultType,
  templateRequestExecutionConfigType,
  templateRequestHandlerType,
];
