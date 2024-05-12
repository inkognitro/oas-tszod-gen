import {
  CodeGenerator,
  OutputType,
  OutputPath,
  DefinitionOutput,
  getConcreteParameter,
  CodeGenerationOutput,
  capitalizeFirstLetter,
} from './core';
import {
  ConcreteParameterLocation,
  isObjectSchema,
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
  parameterLocation: ConcreteParameterLocation,
  payloadParameterNamePrefix?: string
): PayloadRequestParameterCodeGenerationOutput[] {
  const outputs: PayloadRequestParameterCodeGenerationOutput[] = [];
  request.parameters?.forEach(paramOrRef => {
    const p = getConcreteParameter(paramOrRef, codeGenerator);
    if (p.in !== parameterLocation) {
      return;
    }
    const payloadParameterName = payloadParameterNamePrefix
      ? `${payloadParameterNamePrefix}${capitalizeFirstLetter(p.name)}`
      : p.name;
    const parameterSchemaPath = [
      ...path,
      parameterLocation,
      payloadParameterName,
    ];
    const parameterSchemaOutput = applySchema(
      codeGenerator,
      p.schema,
      parameterSchemaPath
    );
    outputs.push({
      createCode: () => {
        const questionMark = !p.required ? '?' : '';
        return `${payloadParameterName}${questionMark}: ${parameterSchemaOutput.createCode(
          path
        )}`;
      },
      createRequestCreationCode: () => {
        return `${p.name}: payload.${payloadParameterName}`;
      },
      requiredOutputPaths: parameterSchemaOutput.requiredOutputPaths,
      path,
      codeComment: parameterSchemaOutput.codeComment,
      payloadParameterName: payloadParameterName,
    });
  });
  return outputs;
}

type PayloadRequestBodyCodeGenerationOutput = CodeGenerationOutput & {
  createRequestCreationCode: () => string;
  contentType: null | string;
  bodyParameterName: null | string;
};

function applyPayloadRequestBodyCodeGenerationOutput(
  request: Request,
  endpointId: EndpointId,
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
  const bodyParameterName = !isObjectSchema(requestBodySchema) ? 'body' : null;
  return {
    ...bodyOutput,
    contentType,
    createRequestCreationCode: () => {
      if (bodyParameterName) {
        return `payload.${bodyParameterName}`;
      }
      return ''; // todo: implement
    },
    bodyParameterName:
      endpointId.method.toLowerCase() === 'get' ? 'body' : null,
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

type PayloadDefinitionOutput = DefinitionOutput & {
  createRequestCreationCode: (endpointIdDefinition: DefinitionOutput) => string;
};

function applyPayloadTypeDefinition(
  codeGenerator: CodeGenerator,
  endpointId: EndpointId,
  request: Request,
  path: OutputPath
): PayloadDefinitionOutput {
  const isGetEndpoint = endpointId.method.toLowerCase() !== 'get';
  const headerParameterOutputs =
    applyPayloadRequestParameterCodeGenerationOutputs(
      request,
      path,
      codeGenerator,
      'header',
      'header'
    );
  const cookieParameterOutputs =
    applyPayloadRequestParameterCodeGenerationOutputs(
      request,
      path,
      codeGenerator,
      'cookie',
      'cookie'
    );
  const queryParameterOutputs =
    applyPayloadRequestParameterCodeGenerationOutputs(
      request,
      path,
      codeGenerator,
      'query',
      isGetEndpoint ? 'query' : undefined
    );
  const pathParameterOutputs =
    applyPayloadRequestParameterCodeGenerationOutputs(
      request,
      path,
      codeGenerator,
      'path'
    );
  const contentType = findPreferredRequestBodyContentType(
    request.requestBody?.content
  );
  const requestBodyContent = contentType
    ? request.requestBody?.content?.[contentType] ?? null
    : null;
  const payloadDefinition: PayloadDefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    path,
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    createCode: () => {
      const parts: string[] = [];
      const allParameters: PayloadRequestParameterCodeGenerationOutput[] = [
        ...pathParameterOutputs,
        ...queryParameterOutputs,
        ...headerParameterOutputs,
        ...cookieParameterOutputs,
      ];
      allParameters.forEach(o => {
        parts.push(o.createCode(path));
      });
      return `{\n${parts.join('\n')}\n}`;
    },
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
      const headerCodeLines = headerParameterOutputs.map(o =>
        o.createRequestCreationCode()
      );
      if (
        !headerParameterOutputs.find(
          p => p.payloadParameterName.toLowerCase() === 'content-type'
        )
      ) {
        headerCodeLines.push(`'Content-Type': '${contentType}'`);
      }
      if (headerCodeLines.length) {
        parts.push(`headers: {${headerCodeLines.join(',\n')}}`);
      }
      const cookieCodeLines = cookieParameterOutputs.map(o =>
        o.createRequestCreationCode()
      );
      if (cookieCodeLines.length) {
        parts.push(`cookies: {${cookieCodeLines.join(',\n')}}`);
      }
      const pathParamCodeLines = pathParameterOutputs.map(o =>
        o.createRequestCreationCode()
      );
      if (pathParamCodeLines.length) {
        parts.push(`pathParams: {${pathParamCodeLines.join(',\n')}}`);
      }
      const queryParamCodeLines = queryParameterOutputs.map(o =>
        o.createRequestCreationCode()
      );
      if (queryParamCodeLines.length) {
        parts.push(`queryParams: {${queryParamCodeLines.join(',\n')}}`);
      }
      return `{\n${parts.join(',\n')}\n}`;
    },
    requiredOutputPaths: [],
  };
  codeGenerator.addOutput(payloadDefinition);
  return payloadDefinition;
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
  const payloadDefinition = applyPayloadTypeDefinition(
    codeGenerator,
    endpointId,
    request,
    [...path, 'payload']
  );
  const requestResultTypeDefinition = applyRequestResultTypeDefinition(
    codeGenerator,
    request,
    [...path, requestResultOutputPathPart]
  );
  codeGenerator.addOutput({
    type: OutputType.DEFINITION,
    definitionType: 'function',
    createName: referencingPath => {
      return codeGenerator.createFunctionName(path, referencingPath);
    },
    createCode: () => {
      const rhTn = templateRequestHandlerType.createName(path);
      const pTn = payloadDefinition.createName(path);
      const rrTn = requestResultTypeDefinition.createName(path);
      const cfgTn = templateRequestExecutionConfigType.createName(path);
      const bodyParts: string[] = [
        `const request = createRequest(${payloadDefinition.createRequestCreationCode(
          endpointIdConstDefinition
        )});`,
        'return requestHandler.execute(request, config);',
      ];
      const funcBody = bodyParts.join('\n');
      return `(requestHandler: ${rhTn}, payload: ${pTn}, config?: ${cfgTn}): Promise<${rrTn}> {${funcBody}}`;
    },
    path,
    requiredOutputPaths: [
      endpointIdConstDefinition.path,
      payloadDefinition.path,
      templateRequestType.path,
      requestResultTypeDefinition.path,
      templateRequestHandlerType.path,
      templateCreateRequestFunction.path,
      templateRequestExecutionConfigType.path,
    ],
  });
}
