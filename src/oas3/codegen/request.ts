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
  Context,
  DefinitionOutput,
  OutputPath,
  OutputType,
} from './core';
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
      !ctx.config.shouldAddRequestBodyContent(contentType, schema)
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

type ApplyRequestLocationParametersResult = {
  hasAtLeastOneRequiredParameter: boolean;
  codeOutput: CodeGenerationOutput;
};

function applyNullableRequestLocationParametersResult(
  codeGenerator: CodeGenerator,
  requestParameters: Parameter[],
  path: OutputPath,
  ctx: Context,
  parameterLocation: ConcreteParameterLocation
): null | ApplyRequestLocationParametersResult {
  const objectSchema = findObjectSchemaFromLocationParameters(
    codeGenerator,
    requestParameters,
    parameterLocation
  );
  if (!objectSchema) {
    return null;
  }
  const codeOutput = applyObjectSchema(codeGenerator, objectSchema, path, ctx);
  return {
    codeOutput,
    hasAtLeastOneRequiredParameter: !!objectSchema.required?.length,
  };
}

export type RequestPayloadField =
  | 'pathParams'
  | 'queryParams'
  | 'headers'
  | 'cookies'
  | 'contentType'
  | 'body';

export type ApplyRequestTypeDefinitionResult = {
  requiredPayloadFields: RequestPayloadField[];
  optionalPayloadFields: RequestPayloadField[];
  typeDefinition: DefinitionOutput;
};

export function applyRequestTypeDefinition(
  codeGenerator: CodeGenerator,
  schema: Endpoint,
  path: OutputPath,
  ctx: Context
): ApplyRequestTypeDefinitionResult {
  const pathParamsCodeOutput = applyNullableRequestLocationParametersResult(
    codeGenerator,
    schema.parameters ?? [],
    [...path, 'pathParams'],
    ctx,
    'path'
  )?.codeOutput;
  const queryParamsResult = applyNullableRequestLocationParametersResult(
    codeGenerator,
    schema.parameters ?? [],
    [...path, 'queryParams'],
    ctx,
    'query'
  );
  const queryParamsCodeOutput = queryParamsResult?.codeOutput;
  const headersCodeOutput = applyNullableRequestLocationParametersResult(
    codeGenerator,
    schema.parameters ?? [],
    [...path, 'headers'],
    ctx,
    'header'
  )?.codeOutput;
  const cookiesCodeOutput = applyNullableRequestLocationParametersResult(
    codeGenerator,
    schema.parameters ?? [],
    [...path, 'cookies'],
    ctx,
    'cookie'
  )?.codeOutput;
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
  const requiredFields: RequestPayloadField[] = [];
  const optionalFields: RequestPayloadField[] = [];
  if (pathParamsCodeOutput) {
    requiredFields.push('pathParams');
  }
  if (
    queryParamsCodeOutput &&
    queryParamsResult?.hasAtLeastOneRequiredParameter
  ) {
    requiredFields.push('queryParams');
  } else if (queryParamsCodeOutput) {
    optionalFields.push('queryParams');
  }
  if (headersCodeOutput) {
    optionalFields.push('headers');
  }
  if (cookiesCodeOutput) {
    optionalFields.push('cookies');
  }
  if (bodyCodeOutput) {
    requiredFields.push('contentType');
    requiredFields.push('body');
  }
  return {
    typeDefinition,
    requiredPayloadFields: requiredFields,
    optionalPayloadFields: optionalFields,
  };
}
