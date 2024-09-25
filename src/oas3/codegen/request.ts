import {
  RequestBodyContent,
  RequestBodyContentByTypeMap,
} from '@/oas3/specification';
import {
  CodeGenerationOutput,
  CodeGenerator,
  containsOutputPath,
  DefinitionOutput,
  OutputPath,
} from './core';
import {GenerateConfig} from './generator';
import {applySchema} from './schema';
import {applyNullableFormDataTypeDefinition} from './formData';

type ApplyRequestBodyResult = {
  contentType: string;
  codeOutput: CodeGenerationOutput;
};

function applyRequestBodyContent(
  codeGenerator: CodeGenerator,
  contentType: string,
  contentSchema: RequestBodyContent,
  parentPath: OutputPath,
  config: GenerateConfig
): ApplyRequestBodyResult {
  const schemaCodeOutput = applySchema(
    codeGenerator,
    contentSchema.schema,
    [...parentPath, contentType],
    config
  );
  let formDataTypeDefinitionOutput: null | DefinitionOutput = null;
  if (contentType.toLowerCase() === 'multipart/form-data') {
    const pathForFormData = [...parentPath, 'FormData'];
    formDataTypeDefinitionOutput = applyNullableFormDataTypeDefinition(
      codeGenerator,
      contentSchema.schema,
      pathForFormData,
      config
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
