import {
  RequestBodyContentByTypeMap,
  ResponseBodyContent,
} from '@oas3/specification';
import {
  CodeGenerationOutput,
  CodeGenerator,
  containsOutputPath,
  OutputPath,
} from './core';
import {GenerateConfig} from './generator';
import {applySchema} from './schema';
import {applyNullableFormDataDefinition} from './formData';

type ApplyRequestBodyResult = {
  contentType: string;
  codeOutput: CodeGenerationOutput;
};

function applyRequestBodyContent(
  codeGenerator: CodeGenerator,
  contentType: string,
  contentSchema: ResponseBodyContent,
  parentPath: OutputPath,
  config: GenerateConfig
): ApplyRequestBodyResult {
  if (contentType.toLowerCase() === 'multipart/form-data') {
    const pathForFormData = [...parentPath, 'FormData'];
    const typedFormData = applyNullableFormDataDefinition(
      codeGenerator,
      contentSchema.schema,
      pathForFormData,
      config
    );
    return {
      contentType,
      codeOutput: {
        path: pathForFormData,
        createCode: referencingPath => {
          if (typedFormData) {
            return typedFormData.createName(referencingPath);
          }
          return 'FormData';
        },
        getRequiredOutputPaths: () => {
          if (typedFormData) {
            return [typedFormData.path];
          }
          return [];
        },
      },
    };
  }
  return {
    contentType,
    codeOutput: applySchema(
      codeGenerator,
      contentSchema.schema,
      [...parentPath, contentType],
      config
    ),
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
    const contentSchema = schema[contentType];
    bodyResults.push(
      applyRequestBodyContent(
        codeGenerator,
        contentType,
        contentSchema,
        path,
        config
      )
    );
  }
  return {
    path,
    createCode: referencingPath => {
      if (!bodyResults.length) {
        return 'any';
      }
      const responseBodyCodeParts: string[] = bodyResults.map(bodyResult => {
        return `{\ncontentType: '${
          bodyResult.contentType
        }',\nbody: ${bodyResult.codeOutput.createCode(referencingPath)}\n}`;
      });
      return responseBodyCodeParts.join(' | ');
    },
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
      bodyResults.forEach(r => {
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
