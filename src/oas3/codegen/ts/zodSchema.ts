import {
  arraySchemaItemOutputPathPart,
  CodeGenerationOutput,
  CodeGenerator,
  ComponentRefOutput,
  CreateCodeFunc,
  objectSchemaAdditionalPropsOutputPathPart,
  oneOfSchemaItemOutputPathPart,
  OutputPath,
  OutputType,
} from './core';
import {
  AllOfSchema,
  ArraySchema,
  BooleanSchema,
  ComponentRef,
  IntegerSchema,
  isAllOfSchema,
  isArraySchema,
  isBooleanSchema,
  isIntegerSchema,
  isNumberSchema,
  isObjectSchema,
  isOneOfSchema,
  isSchemaComponentRef,
  isStringSchema,
  NumberSchema,
  ObjectSchema,
  OneOfSchema,
  Schema,
  StringSchema,
} from '@oas3/specification';
import {templateZOfZodLibrary} from './template';
import {GenerateConfig} from '@oas3/codegen/ts/generator';

export function applyZodSchema(
  codeGenerator: CodeGenerator,
  schema: Schema,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  if (isSchemaComponentRef(schema)) {
    return applyZodComponentRefSchema(
      codeGenerator,
      schema,
      path,
      config,
      preventFromAddingComponentRefs
    );
  }
  if (isBooleanSchema(schema)) {
    return applyZodBooleanSchema(schema, path);
  }
  if (isStringSchema(schema)) {
    return applyZodStringSchema(schema, path);
  }
  if (isNumberSchema(schema)) {
    return applyZodNumberSchema(schema, path);
  }
  if (isIntegerSchema(schema)) {
    return applyZodIntegerSchema(schema, path);
  }
  if (isArraySchema(schema)) {
    return applyZodArraySchema(
      codeGenerator,
      schema,
      path,
      config,
      preventFromAddingComponentRefs
    );
  }
  if (isObjectSchema(schema)) {
    return applyZodObjectSchema(
      codeGenerator,
      schema,
      path,
      config,
      preventFromAddingComponentRefs
    );
  }
  if (isOneOfSchema(schema)) {
    return applyZodOneOfSchema(
      codeGenerator,
      schema,
      path,
      config,
      preventFromAddingComponentRefs
    );
  }
  if (isAllOfSchema(schema)) {
    return applyZodAllOfSchema(
      codeGenerator,
      schema,
      path,
      preventFromAddingComponentRefs
    );
  }
  throw new Error(`schema not supported: ${JSON.stringify(schema)}`);
}

function applyZodBooleanSchema(
  schema: BooleanSchema,
  path: OutputPath
): CodeGenerationOutput {
  return {
    createCode: () => {
      let code = 'z.boolean()';
      if (schema.nullable) {
        code += '.nullable()';
      }
      return code;
    },
    path,
    getRequiredOutputPaths: () => [templateZOfZodLibrary.path],
  };
}

function applyZodStringSchema(
  schema: StringSchema,
  path: OutputPath
): CodeGenerationOutput {
  let codeComment: undefined | string = undefined;
  if (schema.format && schema.format !== 'uuid') {
    codeComment = schema.format;
  }
  return {
    createCode: () => {
      if (schema.enum && schema.enum.length === 1) {
        return `z.literal('${schema.enum[0].replaceAll("'", "\\'")}')`;
      } else if (schema.enum && schema.enum.length > 1) {
        return `z.union([${schema.enum
          .map(v => `z.literal('${v.replaceAll("'", "\\'")}')`)
          .join(',')}])`;
      } else if (schema.format === 'binary') {
        return 'z.any()';
      }
      let code = 'z.string()';
      if (schema.format === 'uuid') {
        code += '.uuid()';
      }
      if (schema.nullable) {
        code += '.nullable()';
      }
      return code;
    },
    path,
    getRequiredOutputPaths: () => [templateZOfZodLibrary.path],
    codeComment,
  };
}

function applyZodArraySchema(
  codeGenerator: CodeGenerator,
  schema: ArraySchema,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const requiredOutputPaths: OutputPath[] = [templateZOfZodLibrary.path];
  const itemOutputPath = [...path, arraySchemaItemOutputPathPart];
  const itemSummary = applyZodSchema(
    codeGenerator,
    schema.items,
    itemOutputPath,
    config,
    preventFromAddingComponentRefs
  );
  requiredOutputPaths.push(itemOutputPath);
  const codeComment = itemSummary.codeComment
    ? `item: ${itemSummary.codeComment}`
    : undefined;
  return {
    createCode: () => {
      return `z.array(${itemSummary.createCode(itemOutputPath)})`;
    },
    codeComment,
    path,
    getRequiredOutputPaths: () => requiredOutputPaths,
  };
}

function applyZodNumberSchema(
  schema: NumberSchema,
  path: OutputPath
): CodeGenerationOutput {
  return {
    createCode: () => {
      let code = 'z.number().safe().finite()';
      if (schema.minimum) {
        code += `.gte(${schema.minimum})`;
      } else if (schema.exclusiveMinimum) {
        code += `.gt(${schema.exclusiveMinimum})`;
      }
      if (schema.maximum) {
        code += `.lte(${schema.maximum})`;
      } else if (schema.exclusiveMinimum) {
        code += `.lt(${schema.exclusiveMinimum})`;
      }
      if (schema.nullable) {
        code += '.nullable()';
      }
      return code;
    },
    path,
    getRequiredOutputPaths: () => [templateZOfZodLibrary.path],
  };
}

function applyZodIntegerSchema(
  schema: IntegerSchema,
  path: OutputPath
): CodeGenerationOutput {
  return {
    createCode: () => {
      let code = 'z.number().int().safe().finite()';
      if (schema.minimum) {
        code += `.gte(${schema.minimum})`;
      } else if (schema.exclusiveMinimum) {
        code += `.gt(${schema.exclusiveMinimum})`;
      }
      if (schema.maximum) {
        code += `.lte(${schema.maximum})`;
      } else if (schema.exclusiveMinimum) {
        code += `.lt(${schema.exclusiveMinimum})`;
      }
      if (schema.nullable) {
        code += '.nullable()';
      }
      return code;
    },
    path,
    getRequiredOutputPaths: () => [templateZOfZodLibrary.path],
  };
}

export function applyZodComponentRefSchema(
  codeGenerator: CodeGenerator,
  schema: ComponentRef,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const output: ComponentRefOutput = {
    type: OutputType.COMPONENT_REF,
    createName: referencingPath => {
      return codeGenerator.createComponentZodSchemaName(
        schema.$ref,
        referencingPath
      );
    },
    componentRef: schema.$ref,
    path,
    getRequiredOutputPaths: () => [
      codeGenerator.createOutputPathByComponentRefForZodSchema(schema.$ref),
    ],
  };
  codeGenerator.addOutput(output, config, preventFromAddingComponentRefs);
  return {
    ...output,
    createCode: referencingPath =>
      codeGenerator.createComponentZodSchemaName(schema.$ref, referencingPath),
  };
}

export function applyZodObjectSchema(
  codeGenerator: CodeGenerator,
  schema: ObjectSchema,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const directOutputByPropNameMap: {
    [propName: string]: {
      createCode: CreateCodeFunc;
      codeComment?: string;
    };
  } = {};
  const requiredOutputPaths: OutputPath[] = [templateZOfZodLibrary.path];
  for (const propName in schema.properties) {
    const propSchema = schema.properties[propName];
    const propSchemaPath = [...path, propName];
    requiredOutputPaths.push(propSchemaPath);
    directOutputByPropNameMap[propName] = applyZodSchema(
      codeGenerator,
      propSchema,
      propSchemaPath,
      config,
      preventFromAddingComponentRefs
    );
  }
  let additionalPropertiesDirectOutput: undefined | CodeGenerationOutput;
  if (schema.additionalProperties) {
    additionalPropertiesDirectOutput = applyZodSchema(
      codeGenerator,
      schema.additionalProperties,
      [...path, objectSchemaAdditionalPropsOutputPathPart],
      config,
      preventFromAddingComponentRefs
    );
  }
  return {
    createCode: () => {
      const codeRows: string[] = [];
      for (const propName in directOutputByPropNameMap) {
        const directOutput = directOutputByPropNameMap[propName];
        const optional = !schema.required?.includes(propName)
          ? '.optional()'
          : '';
        const propComment = directOutput.codeComment
          ? ` // ${directOutput.codeComment}`
          : '';
        codeRows.push(
          `${propName}: ${directOutput.createCode(
            path
          )}${optional},${propComment}`
        );
      }
      let zodAdditionalPropsExtension = '';
      if (additionalPropertiesDirectOutput) {
        zodAdditionalPropsExtension = `.extend(z.record(z.string(), ${additionalPropertiesDirectOutput.createCode(
          path
        )}))`;
      }
      return `z.object({\n${codeRows.join(
        '\n'
      )}\n})${zodAdditionalPropsExtension}`;
    },
    path,
    getRequiredOutputPaths: () => requiredOutputPaths,
  };
}

function applyZodOneOfSchema(
  codeGenerator: CodeGenerator,
  schema: OneOfSchema,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const oneOfItemDirectOutputs: CodeGenerationOutput[] = [];
  const requiredOutputPaths: OutputPath[] = [templateZOfZodLibrary.path];
  schema.oneOf.forEach((itemSchema, index) => {
    const itemPath: OutputPath = [
      ...path,
      oneOfSchemaItemOutputPathPart,
      `${index}`,
    ];
    requiredOutputPaths.push(itemPath);
    const itemOutput = applyZodSchema(
      codeGenerator,
      itemSchema,
      itemPath,
      config,
      preventFromAddingComponentRefs
    );
    oneOfItemDirectOutputs.push(itemOutput);
  });
  return {
    createCode: referencingContext => {
      const codeRows: string[] = [];
      oneOfItemDirectOutputs.forEach(directOutput => {
        const itemComment = directOutput.codeComment
          ? ` // ${directOutput.codeComment}`
          : '';
        codeRows.push(
          `${directOutput.createCode(referencingContext)}${itemComment}`
        );
      });
      const discriminatorName = schema.discriminator?.propertyName;
      if (schema.discriminator?.propertyName) {
        `z.discriminatedUnion('${discriminatorName}', [${codeRows.join(',')}])`;
      }
      return `z.union([${codeRows.join(',')}])`;
    },
    path,
    getRequiredOutputPaths: () => requiredOutputPaths,
  };
}

function applyZodAllOfSchema(
  _codeGenerator: CodeGenerator,
  _schema: AllOfSchema,
  path: OutputPath,
  _preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  return {
    createCode: () => {
      return 'z.any()';
    },
    path,
    getRequiredOutputPaths: () => [templateZOfZodLibrary.path],
  };
}
