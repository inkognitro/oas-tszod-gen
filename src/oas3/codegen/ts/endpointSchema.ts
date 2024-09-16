import {
  CodeGenerationOutput,
  CodeGenerator,
  containsOutputPath,
  DefinitionOutput,
  OutputPath,
  OutputType,
} from './core';
import {GenerateConfig} from './generator';
import {templateEndpointSchemaType, templateZOfZodLibrary} from './template';
import {
  Endpoint,
  RequestBodyContentByTypeMap,
  ResponseBodyContent,
  ResponseByStatusCodeMap,
} from '@oas3/specification';
import {applyZodSchema} from './zodSchema';

type ApplyRequestBodyResult = {
  contentType: string;
  codeOutput: CodeGenerationOutput;
};

function applyRequestBodyContent(
  codeGenerator: CodeGenerator,
  contentType: string,
  bodyContent: ResponseBodyContent,
  path: OutputPath,
  config: GenerateConfig
): ApplyRequestBodyResult {
  let zodSchemaCode: undefined | CodeGenerationOutput;
  if (config.withZod) {
    const zodSchemaPath = [...path, 'zodSchema'];
    zodSchemaCode = applyZodSchema(
      codeGenerator,
      bodyContent.schema,
      zodSchemaPath,
      config
    );
  }
  const codeOutput: CodeGenerationOutput = {
    path,
    createCode: referencingPath => {
      const resultCodeParts: string[] = [];
      resultCodeParts.push(`\ncontentType: '${contentType}'`);
      if (zodSchemaCode) {
        resultCodeParts.push(
          `zodSchema: ${zodSchemaCode.createCode(referencingPath)}`
        );
      }
      return `{\n${resultCodeParts.join(',\n')}\n}`;
    },
    getRequiredOutputPaths: () => {
      if (zodSchemaCode) {
        return [
          ...zodSchemaCode.getRequiredOutputPaths(),
          templateZOfZodLibrary.path,
        ];
      }
      return [];
    },
  };
  return {
    contentType,
    codeOutput,
  };
}

export function applyRequestBodyByContentTypeMap(
  codeGenerator: CodeGenerator,
  schema: RequestBodyContentByTypeMap,
  path: OutputPath,
  config: GenerateConfig
): CodeGenerationOutput {
  const bodyResults: ApplyRequestBodyResult[] = [];
  for (const contentType in schema) {
    const contentTypeBodyPath = [...path, contentType];
    const contentSchema = schema[contentType];
    bodyResults.push(
      applyRequestBodyContent(
        codeGenerator,
        contentType,
        contentSchema,
        contentTypeBodyPath,
        config
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
      return [...outputPaths];
    },
  };
}

export function applyResponseByStatusCodeMap(
  codeGenerator: CodeGenerator,
  schema: ResponseByStatusCodeMap,
  path: OutputPath,
  config: GenerateConfig
): CodeGenerationOutput {
  return {
    path,
    createCode: referencingPath => {
      return '{}';
    },
    getRequiredOutputPaths: () => {
      return [];
    },
  };
}

export function applyEndpointSchemaConstDefinition(
  codeGenerator: CodeGenerator,
  urlPath: string,
  requestMethod: string,
  schema: Endpoint,
  outputPath: OutputPath,
  config: GenerateConfig
): DefinitionOutput {
  let bodyByContentTypeMapCodeOutput: undefined | CodeGenerationOutput;
  if (schema.requestBody?.content) {
    bodyByContentTypeMapCodeOutput = applyRequestBodyByContentTypeMap(
      codeGenerator,
      schema.requestBody.content,
      [...outputPath, 'body'],
      config
    );
  }
  const responseByStatusCodeMapOutput = applyResponseByStatusCodeMap(
    codeGenerator,
    schema.responses,
    [...outputPath, 'response'],
    config
  );
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
              ? `['${permissions.join("'")}']`
              : '[]';
            securitySchemasCodeParts.push(
              `{ name: '${securityName}', requiredPermissions: ${permissionsCodePart}}`
            );
          }
        });
      }
      const codeParts: string[] = [
        `method:'${requestMethod}'`,
        `path:'${urlPath}'`,
        `supportedSecuritySchemas: [${securitySchemasCodeParts.join(', ')}]`,
      ];
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
        `bodyByContentType: ${responseByStatusCodeMapOutput.createCode(
          outputPath
        )}`
      );
      return `{\n${codeParts.join(', \n')}\n}`;
    },
    getRequiredOutputPaths: () => [templateEndpointSchemaType.path],
  };
  codeGenerator.addOutput(definition, config);
  return definition;
}
