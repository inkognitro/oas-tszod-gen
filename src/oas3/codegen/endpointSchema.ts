import {
  CodeGenerationOutput,
  CodeGenerator,
  containsOutputPath,
  DefinitionOutput,
  OutputPath,
  OutputType,
} from './core';
import {Context} from './generator';
import {
  ConcreteParameterLocation,
  concreteParameterLocations,
  Endpoint,
  Parameter,
  RequestBodyContent,
  RequestBodyContentByTypeMap,
  ResponseByStatusCodeMap,
} from '@/oas3/specification';
import {applyZodSchema} from './zodSchema';
import {applyResponseSchema} from './responseSchema';
import {findObjectSchemaFromLocationParameters} from './endpointPayloadUtils';

type ApplyRequestBodyResult = {
  contentType: string;
  codeOutput: CodeGenerationOutput;
};

function applyRequestBodyContent(
  codeGenerator: CodeGenerator,
  contentType: string,
  bodyContent: RequestBodyContent,
  path: OutputPath,
  ctx: Context
): ApplyRequestBodyResult {
  let zodSchemaCode: undefined | CodeGenerationOutput;
  if (ctx.config.withZod) {
    const zodSchemaPath = [...path, 'zodSchema'];
    zodSchemaCode = applyZodSchema(
      codeGenerator,
      bodyContent.schema,
      zodSchemaPath,
      ctx
    );
  }
  const codeOutput: CodeGenerationOutput = {
    path,
    createCode: referencingPath => {
      const resultCodeParts: string[] = [];
      if (zodSchemaCode) {
        resultCodeParts.push(
          `zodSchema: ${zodSchemaCode.createCode(referencingPath)}`
        );
      }
      return `{\n${resultCodeParts.join(',\n')}\n}`;
    },
    getRequiredOutputPaths: () => {
      if (zodSchemaCode) {
        return zodSchemaCode.getRequiredOutputPaths();
      }
      return [];
    },
  };
  return {
    contentType,
    codeOutput,
  };
}

function applyRequestBodyByContentTypeMap(
  codeGenerator: CodeGenerator,
  schema: RequestBodyContentByTypeMap,
  path: OutputPath,
  ctx: Context
): CodeGenerationOutput {
  const bodyResults: ApplyRequestBodyResult[] = [];
  for (const contentType in schema) {
    const lowercaseContentType = contentType.toLowerCase();
    const contentTypeBodyPath = [...path, lowercaseContentType];
    const contentSchema = schema[contentType];
    bodyResults.push(
      applyRequestBodyContent(
        codeGenerator,
        lowercaseContentType,
        contentSchema,
        contentTypeBodyPath,
        ctx
      )
    );
  }
  return {
    path,
    createCode: referencingPath => {
      if (!Object.keys(schema).length) {
        return '{}';
      }
      const codeParts: string[] = [];
      bodyResults.map(bodyResult => {
        codeParts.push(
          `'${bodyResult.contentType}': ${bodyResult.codeOutput.createCode(
            referencingPath
          )}`
        );
      });
      return `{\n${codeParts.join(',\n')}\n}`;
    },
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
      bodyResults.forEach(result => {
        result.codeOutput.getRequiredOutputPaths().forEach(outputPath => {
          if (!containsOutputPath(outputPaths, outputPath)) {
            outputPaths.push(outputPath);
          }
        });
      });
      return outputPaths;
    },
  };
}

function applyResponseByStatusCodeMap(
  codeGenerator: CodeGenerator,
  schema: ResponseByStatusCodeMap,
  path: OutputPath,
  ctx: Context
): CodeGenerationOutput {
  type ResponseResult = {status: string; codeOutput: CodeGenerationOutput};
  const responseResults: ResponseResult[] = [];
  for (const status in schema) {
    const response = schema[status];
    responseResults.push({
      status,
      codeOutput: applyResponseSchema(
        codeGenerator,
        response,
        [...path, status],
        ctx
      ),
    });
  }
  return {
    path,
    createCode: referencingPath => {
      if (!Object.keys(schema).length) {
        return '{}';
      }
      const codeParts: string[] = [];
      responseResults.map(result => {
        codeParts.push(
          `'${result.status}': ${result.codeOutput.createCode(referencingPath)}`
        );
      });
      return `{\n${codeParts.join(',\n')}\n}`;
    },
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
      responseResults.forEach(result => {
        result.codeOutput.getRequiredOutputPaths().forEach(outputPath => {
          if (!containsOutputPath(outputPaths, outputPath)) {
            outputPaths.push(outputPath);
          }
        });
      });
      return outputPaths;
    },
  };
}

type ParameterZodSchemaResult = {
  payloadPropName: string;
  codeOutput: CodeGenerationOutput;
};

function applyParameterZodSchemas(
  codeGenerator: CodeGenerator,
  parameterSchemas: Parameter[],
  path: OutputPath,
  ctx: Context
): ParameterZodSchemaResult[] {
  const results: ParameterZodSchemaResult[] = [];
  const payloadPropNameByParamLocation: {
    [key in ConcreteParameterLocation]: string;
  } = {
    header: 'headersZodSchema',
    cookie: 'cookiesZodSchema',
    path: 'pathParamsZodSchema',
    query: 'queryParamsZodSchema',
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
    const payloadPropName = payloadPropNameByParamLocation[paramLocation];
    if (!payloadPropName) {
      return;
    }
    results.push({
      payloadPropName,
      codeOutput: applyZodSchema(
        codeGenerator,
        objectSchema,
        [...path, payloadPropName],
        ctx
      ),
    });
  });
  return results;
}

export function applyEndpointSchemaConstDefinition(
  codeGenerator: CodeGenerator,
  urlPath: string,
  requestMethod: string,
  schema: Endpoint,
  outputPath: OutputPath,
  ctx: Context
): DefinitionOutput {
  let bodyByContentTypeMapCodeOutput: undefined | CodeGenerationOutput;
  if (schema.requestBody?.content) {
    bodyByContentTypeMapCodeOutput = applyRequestBodyByContentTypeMap(
      codeGenerator,
      schema.requestBody.content,
      [...outputPath, 'body'],
      ctx
    );
  }
  const responseByStatusCodeMapOutput = applyResponseByStatusCodeMap(
    codeGenerator,
    schema.responses,
    [...outputPath, 'response'],
    ctx
  );
  let parameterZodSchemaResults: undefined | ParameterZodSchemaResult[];
  if (ctx.config.withZod && schema.parameters) {
    parameterZodSchemaResults = applyParameterZodSchemas(
      codeGenerator,
      schema.parameters,
      outputPath,
      ctx
    );
  }
  const definition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'const',
    path: outputPath,
    createName: referencingPath => {
      return codeGenerator.createConstName(outputPath, referencingPath);
    },
    createCode: () => {
      const securitySchemasCodeParts: string[] = [];
      if (schema.security) {
        schema.security.forEach(permissionsBySecurityName => {
          for (const securityName in permissionsBySecurityName) {
            const permissions = permissionsBySecurityName[securityName];
            const permissionsCodePart = permissions.length
              ? `['${permissions.join("', '")}']`
              : '[]';
            securitySchemasCodeParts.push(
              `{ name: '${securityName}', requiredPermissions: ${permissionsCodePart}}`
            );
          }
        });
      }
      const codeParts: string[] = [
        `path: '${urlPath}'`,
        `method: '${requestMethod}'`,
        `supportedSecuritySchemas: [${securitySchemasCodeParts.join(', ')}]`,
      ];
      if (parameterZodSchemaResults) {
        parameterZodSchemaResults.forEach(result => {
          codeParts.push(
            `${result.payloadPropName}: ${result.codeOutput.createCode(
              outputPath
            )}`
          );
        });
      }
      if (bodyByContentTypeMapCodeOutput) {
        codeParts.push(
          `bodyByContentType: ${bodyByContentTypeMapCodeOutput.createCode(
            outputPath
          )}`
        );
      } else {
        codeParts.push('bodyByContentType: {}');
      }
      codeParts.push(
        `responseByStatus: ${responseByStatusCodeMapOutput.createCode(
          outputPath
        )}`
      );
      return `{\n${codeParts.join(', \n')}\n}`;
    },
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
      if (parameterZodSchemaResults) {
        parameterZodSchemaResults.forEach(result => {
          result.codeOutput.getRequiredOutputPaths().forEach(outputPath => {
            if (!containsOutputPath(outputPaths, outputPath)) {
              outputPaths.push(outputPath);
            }
          });
        });
      }
      if (bodyByContentTypeMapCodeOutput) {
        bodyByContentTypeMapCodeOutput
          .getRequiredOutputPaths()
          .forEach(outputPath => {
            if (!containsOutputPath(outputPaths, outputPath)) {
              outputPaths.push(outputPath);
            }
          });
      }
      responseByStatusCodeMapOutput
        .getRequiredOutputPaths()
        .forEach(outputPath => {
          if (!containsOutputPath(outputPaths, outputPath)) {
            outputPaths.push(outputPath);
          }
        });
      return outputPaths;
    },
  };
  codeGenerator.addOutput(definition, ctx);
  return definition;
}
