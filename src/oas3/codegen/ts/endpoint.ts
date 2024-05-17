import {
  CodeGenerator,
  OutputType,
  OutputPath,
  DefinitionOutput,
  getConcreteParameter,
  CodeGenerationOutput,
} from './core';
import {
  ConcreteParameterLocation,
  Request,
  RequestBodyContentByTypeMap,
} from '@oas3/specification';
import {applyResponseByStatusCodeMap} from './response';
import {
  templateCreateRequestFunction,
  templateRequestExecutionConfigType,
  templateRequestHandlerType,
  templateRequestResultType,
  templateRequestType,
} from './template';
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
  path: OutputPath
): DefinitionOutput {
  const responseType = applyResponseByStatusCodeMap(
    codeGenerator,
    schema.responses,
    [...path, responseOutputPathPart]
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

type PayloadRequestParameterCodeGenerationOutput = CodeGenerationOutput & {
  createRequestCreationCode: () => string;
  payloadParameterName: string;
};

function applyPayloadRequestParameterCodeGenerationOutputs(
  request: Request,
  path: OutputPath,
  codeGenerator: CodeGenerator,
  parameterLocation: ConcreteParameterLocation
): PayloadRequestParameterCodeGenerationOutput[] {
  const outputs: PayloadRequestParameterCodeGenerationOutput[] = [];
  request.parameters?.forEach(paramOrRef => {
    const p = getConcreteParameter(paramOrRef, codeGenerator);
    if (p.in !== parameterLocation) {
      return;
    }
    const parameterSchemaPath = [...path, parameterLocation, p.name];
    const parameterSchemaOutput = applySchema(
      codeGenerator,
      p.schema,
      parameterSchemaPath
    );
    outputs.push({
      createCode: () => {
        const questionMark = !p.required ? '?' : '';
        return `${p.name}${questionMark}: ${parameterSchemaOutput.createCode(
          path
        )}`;
      },
      createRequestCreationCode: () => {
        return `${p.name}: payload.${p.name}`;
      },
      requiredOutputPaths: parameterSchemaOutput.requiredOutputPaths,
      path,
      codeComment: parameterSchemaOutput.codeComment,
      payloadParameterName: p.name,
    });
  });
  return outputs;
}

type PayloadRequestBodyCodeGenerationOutput = CodeGenerationOutput & {
  contentType: null | string;
};

function applyPayloadRequestBodyCodeGenerationOutput(
  request: Request,
  path: OutputPath,
  codeGenerator: CodeGenerator
): null | PayloadRequestBodyCodeGenerationOutput {
  const contentType = findPreferredRequestBodyContentType(
    request.requestBody?.content
  );
  const requestBodyContent = contentType
    ? request.requestBody?.content?.[contentType] ?? null
    : null;
  const requestBodySchema = requestBodyContent?.schema;
  if (!requestBodySchema) {
    return null;
  }
  const bodyOutput = applySchema(codeGenerator, requestBodySchema, [
    ...path,
    'body',
  ]);
  return {...bodyOutput, contentType};
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

type PayloadUtils = {
  payloadDefinition: null | DefinitionOutput;
  createRequestCreationCode: (endpointIdDefinition: DefinitionOutput) => string;
};

function applyPayloadUtils(
  codeGenerator: CodeGenerator,
  request: Request,
  path: OutputPath
): PayloadUtils {
  const headerParamOutputs = applyPayloadRequestParameterCodeGenerationOutputs(
    request,
    path,
    codeGenerator,
    'header'
  );
  const cookieParameterOutputs =
    applyPayloadRequestParameterCodeGenerationOutputs(
      request,
      path,
      codeGenerator,
      'cookie'
    );
  const queryParameterOutputs =
    applyPayloadRequestParameterCodeGenerationOutputs(
      request,
      path,
      codeGenerator,
      'query'
    );
  const pathParameterOutputs =
    applyPayloadRequestParameterCodeGenerationOutputs(
      request,
      path,
      codeGenerator,
      'path'
    );
  const bodyOutput = applyPayloadRequestBodyCodeGenerationOutput(
    request,
    [...path, 'body'],
    codeGenerator
  );
  const shouldAddPayload =
    headerParamOutputs.length ||
    cookieParameterOutputs.length ||
    queryParameterOutputs.length ||
    pathParameterOutputs.length ||
    bodyOutput;
  const payloadDefinition: null | DefinitionOutput = shouldAddPayload
    ? {
        type: OutputType.DEFINITION,
        definitionType: 'type',
        path,
        createName: referencingPath => {
          return codeGenerator.createTypeName(path, referencingPath);
        },
        createCode: () => {
          const parts: string[] = [];

          if (pathParameterOutputs.length) {
            const codeParts: string[] = pathParameterOutputs.map(o =>
              o.createCode(path)
            );
            parts.push(`pathParams: {${codeParts.join(';\n')}}`);
          }

          if (queryParameterOutputs.length) {
            const codeParts: string[] = queryParameterOutputs.map(o =>
              o.createCode(path)
            );
            parts.push(`queryParams: {${codeParts.join(';\n')}}`);
          }

          if (headerParamOutputs.length) {
            const codeParts: string[] = headerParamOutputs.map(o =>
              o.createCode(path)
            );
            parts.push(`headers: {${codeParts.join(';\n')}}`);
          }

          if (cookieParameterOutputs.length) {
            const codeParts: string[] = cookieParameterOutputs.map(o =>
              o.createCode(path)
            );
            parts.push(`cookies: {${codeParts.join(';\n')}}`);
          }
          if (bodyOutput) {
            parts.push(`body: ${bodyOutput.createCode(path)}`);
          }
          return `{\n${parts.join(';\n')}\n}`;
        },
        requiredOutputPaths: [],
      }
    : null;
  if (payloadDefinition) {
    codeGenerator.addOutput(payloadDefinition);
  }
  return {
    payloadDefinition,
    createRequestCreationCode: (endpointIdDefinition: DefinitionOutput) => {
      const parts: string[] = [];
      parts.push(`endpointId: ${endpointIdDefinition.createName(path)}`);
      const supportedSecuritySchemes =
        request.security?.reduce<string[]>(
          (allSecuritySchemes, permissionsBySecurityName) => {
            const currentSecurityNames = Object.keys(permissionsBySecurityName);
            const nextAllSecuritySchemes = [...allSecuritySchemes];
            currentSecurityNames.forEach(securityScheme => {
              if (!nextAllSecuritySchemes.includes(securityScheme)) {
                nextAllSecuritySchemes.push(securityScheme);
              }
            });
            return nextAllSecuritySchemes;
          },
          []
        ) ?? [];
      if (supportedSecuritySchemes.length) {
        parts.push(
          `supportedSecuritySchemes: ['${supportedSecuritySchemes.join(
            "', '"
          )}']`
        );
      }
      const bodyContentType = bodyOutput?.contentType;
      const shouldDefineContentTypeHeader =
        bodyContentType &&
        !headerParamOutputs.find(
          p => p.payloadParameterName.toLowerCase() === 'content-type'
        );
      const contentTypeHeaderPart = shouldDefineContentTypeHeader
        ? `'Content-Type': '${bodyContentType}'`
        : null;
      if (contentTypeHeaderPart && !headerParamOutputs.length) {
        parts.push(`headers: { ${contentTypeHeaderPart} }`);
      } else if (contentTypeHeaderPart && headerParamOutputs.length) {
        parts.push(`headers: {...payload.headers, ${contentTypeHeaderPart}}`);
      } else if (!contentTypeHeaderPart && headerParamOutputs.length) {
        parts.push('headers: payload.headers');
      }
      if (cookieParameterOutputs.length) {
        parts.push('cookies: payload.cookies');
      }
      if (pathParameterOutputs.length) {
        parts.push('pathParams: payload.pathParams');
      }
      if (queryParameterOutputs.length) {
        parts.push('queryParams: payload.queryParams');
      }
      if (bodyOutput) {
        parts.push('body: payload.body');
      }
      return `{\n${parts.join(',\n')}\n}`;
    },
  };
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
  request: Request
) {
  const path = codeGenerator.createOperationOutputPath(request.operationId);
  const endpointIdConstDefinition = applyEndpointIdConstDefinition(
    codeGenerator,
    endpointId,
    [...path, 'endpointId']
  );
  const payloadUtils = applyPayloadUtils(codeGenerator, request, [
    ...path,
    'payload',
  ]);
  const requestResultTypeDefinition = applyRequestResultTypeDefinition(
    codeGenerator,
    request,
    [...path, requestResultOutputPathPart]
  );
  const requiredOutputPaths: OutputPath[] = [
    endpointIdConstDefinition.path,
    templateRequestType.path,
    requestResultTypeDefinition.path,
    templateRequestHandlerType.path,
    templateCreateRequestFunction.path,
    templateRequestExecutionConfigType.path,
  ];
  if (payloadUtils.payloadDefinition) {
    requiredOutputPaths.push(payloadUtils.payloadDefinition.path);
  }
  codeGenerator.addOutput({
    type: OutputType.DEFINITION,
    definitionType: 'function',
    createName: referencingPath => {
      return codeGenerator.createFunctionName(path, referencingPath);
    },
    createCode: () => {
      const rhTn = templateRequestHandlerType.createName(path);
      const pTn = payloadUtils.payloadDefinition?.createName(path);
      const payloadParamCode = pTn ? `, payload: ${pTn}` : '';
      const rrTn = requestResultTypeDefinition.createName(path);
      const cfgTn = templateRequestExecutionConfigType.createName(path);
      const bodyParts: string[] = [
        `const request = createRequest(${payloadUtils.createRequestCreationCode(
          endpointIdConstDefinition
        )});`,
        'return requestHandler.execute(request, config);',
      ];
      const funcBody = bodyParts.join('\n');
      return `(requestHandler: ${rhTn}${payloadParamCode}, config?: ${cfgTn}): Promise<${rrTn}> {${funcBody}}`;
    },
    path,
    requiredOutputPaths,
  });
}
