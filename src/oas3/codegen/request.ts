import {
  ConcreteParameterLocation,
  Endpoint,
  Parameter,
  RequestBodyContent,
  RequestBodyContentByContentTypeMap,
} from '@/oas3/specification';
import {
  CodeGenerationOutput,
  CodeGenerator,
  containsOutputPath,
  DefinitionOutput,
  OutputPath,
  OutputType,
} from './core';
import {Context} from './generator';
import {applyObjectSchema, applySchema} from './schema';
import {applyNullableFormDataTypeDefinition} from './formData';
import {findObjectSchemaFromLocationParameters} from '@/oas3/codegen/endpointUtils';
import {
  templateRequestBodyDataType,
  templateRequestType,
  templateRequestUnionType,
} from '@/oas3/codegen/template';

type ApplyRequestBodyResult = {
  contentType: string;
  codeOutput: CodeGenerationOutput;
};

function applyRequestBodyContent(
  codeGenerator: CodeGenerator,
  contentType: string,
  contentSchema: RequestBodyContent,
  parentPath: OutputPath,
  ctx: Context
): ApplyRequestBodyResult {
  const schemaCodeOutput = applySchema(
    codeGenerator,
    contentSchema.schema,
    [...parentPath, contentType],
    ctx
  );
  let formDataTypeDefinitionOutput: null | DefinitionOutput = null;
  if (contentType.toLowerCase().match(/multipart\/form-data;?.*/)) {
    const pathForFormData = [...parentPath, 'FormData'];
    formDataTypeDefinitionOutput = applyNullableFormDataTypeDefinition(
      codeGenerator,
      contentSchema.schema,
      pathForFormData,
      ctx
    );
  }
  return {
    contentType,
    codeOutput: {
      ...schemaCodeOutput,
      createCode: referencingPath => {
        const codeParts: string[] = [];
        if (formDataTypeDefinitionOutput) {
          codeParts.push(
            formDataTypeDefinitionOutput.createName(referencingPath)
          );
        }
        codeParts.push(schemaCodeOutput.createCode(referencingPath));
        return codeParts.join('\n| ');
      },
      getRequiredOutputPaths: () => {
        const paths = [...schemaCodeOutput.getRequiredOutputPaths()];
        if (formDataTypeDefinitionOutput) {
          paths.push(formDataTypeDefinitionOutput.path);
        }
        return paths;
      },
    },
  };
}

function applyNullableRequestBodyByContentTypeMap(
  codeGenerator: CodeGenerator,
  schema: RequestBodyContentByContentTypeMap,
  path: OutputPath,
  ctx: Context
): null | CodeGenerationOutput {
  const bodyCodeOutputs: ApplyRequestBodyResult[] = [];
  for (const contentType in schema) {
    const contentSchema = schema[contentType];
    if (
      ctx.config.shouldAddRequestBodyContent &&
      !ctx.config.shouldAddRequestBodyContent(contentType, contentSchema)
    ) {
      continue;
    }
    bodyCodeOutputs.push(
      applyRequestBodyContent(
        codeGenerator,
        contentType,
        contentSchema,
        path,
        ctx
      )
    );
  }
  if (!bodyCodeOutputs.length) {
    return null;
  }
  return {
    path,
    createCode: referencingPath => {
      const bodyCodeParts: string[] = bodyCodeOutputs.map(output => {
        const parts = [
          `'${output.contentType}'`,
          output.codeOutput.createCode(referencingPath),
        ];
        return `${templateRequestBodyDataType.createName(referencingPath)}<${parts.join(',')}>`;
      });
      return bodyCodeParts.join(' | ');
    },
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [templateRequestBodyDataType.path];
      bodyCodeOutputs.forEach(r => {
        r.codeOutput.getRequiredOutputPaths().forEach(path => {
          if (!containsOutputPath(outputPaths, path)) {
            outputPaths.push(path);
          }
        });
      });
      return outputPaths;
    },
  };
}

function applyNullableRequestLocationParameters(
  codeGenerator: CodeGenerator,
  requestParameters: Parameter[],
  path: OutputPath,
  ctx: Context,
  parameterLocation: ConcreteParameterLocation
): null | CodeGenerationOutput {
  const objectSchema = findObjectSchemaFromLocationParameters(
    codeGenerator,
    requestParameters,
    parameterLocation
  );
  if (!objectSchema) {
    return null;
  }
  return applyObjectSchema(codeGenerator, objectSchema, path, ctx);
}

export type RequestPayloadField =
  | 'pathParams'
  | 'queryParams'
  | 'headers'
  | 'cookies'
  | 'contentType'
  | 'body';

export type ApplyRequestTypeDefinitionResult = {
  payloadFields: RequestPayloadField[];
  typeDefinition: DefinitionOutput;
};

export function applyRequestTypeDefinition(
  codeGenerator: CodeGenerator,
  schema: Endpoint,
  path: OutputPath,
  ctx: Context
): ApplyRequestTypeDefinitionResult {
  const pathParamsCodeOutput = applyNullableRequestLocationParameters(
    codeGenerator,
    schema.parameters ?? [],
    [...path, 'pathParams'],
    ctx,
    'path'
  );
  const queryParamsCodeOutput = applyNullableRequestLocationParameters(
    codeGenerator,
    schema.parameters ?? [],
    [...path, 'queryParams'],
    ctx,
    'query'
  );
  const headersCodeOutput = applyNullableRequestLocationParameters(
    codeGenerator,
    schema.parameters ?? [],
    [...path, 'headers'],
    ctx,
    'header'
  );
  const cookiesCodeOutput = applyNullableRequestLocationParameters(
    codeGenerator,
    schema.parameters ?? [],
    [...path, 'cookies'],
    ctx,
    'cookie'
  );
  let bodyCodeOutput: CodeGenerationOutput | null = null;
  if (schema.requestBody?.content) {
    bodyCodeOutput = applyNullableRequestBodyByContentTypeMap(
      codeGenerator,
      schema.requestBody.content,
      path,
      ctx
    );
  }
  const hasNoSpecificRequestProperties =
    !pathParamsCodeOutput &&
    !queryParamsCodeOutput &&
    !headersCodeOutput &&
    !cookiesCodeOutput &&
    !bodyCodeOutput;
  const typeDefinition: DefinitionOutput = {
    type: OutputType.DEFINITION,
    definitionType: 'type',
    createName: referencingPath => {
      return codeGenerator.createTypeName(path, referencingPath);
    },
    createCode: () => {
      if (hasNoSpecificRequestProperties) {
        return templateRequestType.createName(path);
      }
      const codeParts = [
        bodyCodeOutput ? bodyCodeOutput.createCode(path) : 'any',
      ];
      if (pathParamsCodeOutput) {
        codeParts.push(pathParamsCodeOutput.createCode(path));
      } else if (
        queryParamsCodeOutput ||
        headersCodeOutput ||
        cookiesCodeOutput
      ) {
        codeParts.push('any');
      }
      if (queryParamsCodeOutput) {
        codeParts.push(queryParamsCodeOutput.createCode(path));
      } else if (headersCodeOutput || cookiesCodeOutput) {
        codeParts.push('any');
      }
      if (headersCodeOutput) {
        codeParts.push(headersCodeOutput.createCode(path));
      } else if (cookiesCodeOutput) {
        codeParts.push('any');
      }
      if (cookiesCodeOutput) {
        codeParts.push(cookiesCodeOutput.createCode(path));
      }
      return `${templateRequestUnionType.createName(path)}<${codeParts.join(',\n')}>`;
    },
    path,
    getRequiredOutputPaths: () => {
      if (hasNoSpecificRequestProperties) {
        return [templateRequestType.path];
      }
      const outputPaths: OutputPath[] = [templateRequestUnionType.path];
      const codeOutputsToInclude: CodeGenerationOutput[] = [];
      if (pathParamsCodeOutput) {
        codeOutputsToInclude.push(pathParamsCodeOutput);
      }
      if (queryParamsCodeOutput) {
        codeOutputsToInclude.push(queryParamsCodeOutput);
      }
      if (headersCodeOutput) {
        codeOutputsToInclude.push(headersCodeOutput);
      }
      if (cookiesCodeOutput) {
        codeOutputsToInclude.push(cookiesCodeOutput);
      }
      if (bodyCodeOutput) {
        codeOutputsToInclude.push(bodyCodeOutput);
      }
      codeOutputsToInclude.forEach(codeOutput => {
        codeOutput.getRequiredOutputPaths().forEach(path => {
          if (!containsOutputPath(outputPaths, path)) {
            outputPaths.push(path);
          }
        });
      });
      return outputPaths;
    },
  };
  codeGenerator.addOutput(typeDefinition, ctx);
  const includedFields: RequestPayloadField[] = [];
  if (pathParamsCodeOutput) {
    includedFields.push('pathParams');
  }
  if (queryParamsCodeOutput) {
    includedFields.push('queryParams');
  }
  if (headersCodeOutput) {
    includedFields.push('headers');
  }
  if (cookiesCodeOutput) {
    includedFields.push('cookies');
  }
  if (bodyCodeOutput) {
    includedFields.push('contentType');
    includedFields.push('body');
  }
  return {
    typeDefinition,
    payloadFields: includedFields,
  };
}
