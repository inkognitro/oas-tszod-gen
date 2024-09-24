import {
  arraySchemaItemOutputPathPart,
  CodeGenerationOutput,
  CodeGenerator,
  ComponentRefOutput,
  containsOutputPath,
  CreateCodeFunc,
  objectSchemaAdditionalPropsOutputPathPart,
  OutputPath,
  OutputType,
} from './core';
import {
  AllOfSchema,
  AnyOfSchema,
  ArraySchema,
  BooleanSchema,
  ComponentRef,
  IntegerSchema,
  isAllOfSchema,
  isAnyOfSchema,
  isArraySchema,
  isBooleanSchema,
  isIntegerSchema,
  isNumberSchema,
  isObjectSchema,
  isOneOfSchema,
  isSchema,
  isSchemaComponentRef,
  isStringSchema,
  NumberSchema,
  ObjectSchema,
  OneOfSchema,
  Schema,
  StringSchema,
} from '@/oas3/specification';
import {templateZOfZodLibrary} from './template';
import {GenerateConfig} from './generator';

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
      config,
      preventFromAddingComponentRefs
    );
  }
  if (isAnyOfSchema(schema)) {
    return applyZodAnyOfSchema(
      codeGenerator,
      schema,
      path,
      config,
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
      return codeGenerator.createComponentConstNameForZodSchema(
        schema.$ref,
        referencingPath
      );
    },
    componentRef: schema.$ref,
    path,
    getRequiredOutputPaths: () => [
      codeGenerator.createOutputPathByComponentRefForZodSchemaConst(
        schema.$ref
      ),
    ],
  };
  codeGenerator.addOutput(output, config, preventFromAddingComponentRefs);
  const isRecursive = preventFromAddingComponentRefs.includes(schema.$ref);
  if (isRecursive) {
    codeGenerator.addOutputPathWithZodSchemaRecursion(
      codeGenerator.createOutputPathByComponentRefForZodSchemaConst(schema.$ref)
    );
  }
  return {
    ...output,
    createCode: referencingPath => {
      const constName = codeGenerator.createComponentConstNameForZodSchema(
        schema.$ref,
        referencingPath
      );
      if (isRecursive) {
        return `z.lazy(() => ${constName})`;
      }
      return constName;
    },
    getRequiredOutputPaths: () => {
      const outputPaths = [...output.getRequiredOutputPaths()];
      if (isRecursive) {
        outputPaths.push(templateZOfZodLibrary.path);
      }
      return outputPaths;
    },
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
          `'${propName}': ${directOutput.createCode(
            path
          )}${optional},${propComment}`
        );
      }
      if (!codeRows.length && additionalPropertiesDirectOutput) {
        return `z.record(${additionalPropertiesDirectOutput.createCode(path)})`;
      }
      let zodAdditionalPropsCode = '';
      if (additionalPropertiesDirectOutput) {
        zodAdditionalPropsCode = `.catchall(${additionalPropertiesDirectOutput.createCode(path)})`;
      }
      return `z.object({\n${codeRows.join('\n')}\n})${zodAdditionalPropsCode}`;
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
  const itemCodeOutputs: CodeGenerationOutput[] = [];
  schema.oneOf.forEach((itemSchema, index) => {
    const itemPath: OutputPath = [...path, `${index}`];
    const itemOutput = applyZodSchema(
      codeGenerator,
      itemSchema,
      itemPath,
      config,
      preventFromAddingComponentRefs
    );
    itemCodeOutputs.push(itemOutput);
  });
  return {
    createCode: referencingContext => {
      const codeRows: string[] = [];
      itemCodeOutputs.forEach(directOutput => {
        codeRows.push(`${directOutput.createCode(referencingContext)}`);
      });
      if (!codeRows.length) {
        return 'z.any()';
      }
      const discriminatorName = schema.discriminator?.propertyName;
      if (schema.discriminator?.propertyName) {
        `z.discriminatedUnion('${discriminatorName}', [${codeRows.join(',')}])`;
      }
      if (codeRows.length === 1) {
        return codeRows[0];
      }
      return `z.union([${codeRows.join(',')}])`;
    },
    path,
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [templateZOfZodLibrary.path];
      itemCodeOutputs.forEach(itemCodeOutput => {
        itemCodeOutput.getRequiredOutputPaths().forEach(outputPath => {
          if (!containsOutputPath(outputPaths, outputPath)) {
            outputPaths.push(outputPath);
          }
        });
      });
      return outputPaths;
    },
  };
}

function applyZodAllOfSchema(
  codeGenerator: CodeGenerator,
  schema: AllOfSchema,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const itemCodeOutputs: CodeGenerationOutput[] = [];
  schema.allOf.forEach((itemSchema, index) => {
    if (!isSchema(itemSchema)) {
      return;
    }
    const itemPath: OutputPath = [...path, `${index}`];
    const itemOutput = applyZodSchema(
      codeGenerator,
      itemSchema,
      itemPath,
      config,
      preventFromAddingComponentRefs
    );
    itemCodeOutputs.push(itemOutput);
  });
  return {
    createCode: referencingContext => {
      const codeRows: string[] = [];
      itemCodeOutputs.forEach(directOutput => {
        codeRows.push(`${directOutput.createCode(referencingContext)}`);
      });
      if (!codeRows.length) {
        return 'z.any()';
      }
      if (codeRows.length === 1) {
        return codeRows[0];
      }
      return `z.intersection([${codeRows.join(',')}])`;
    },
    path,
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [templateZOfZodLibrary.path];
      itemCodeOutputs.forEach(itemCodeOutput => {
        itemCodeOutput.getRequiredOutputPaths().forEach(outputPath => {
          if (!containsOutputPath(outputPaths, outputPath)) {
            outputPaths.push(outputPath);
          }
        });
      });
      return outputPaths;
    },
  };
}

function applyZodAnyOfSchema(
  codeGenerator: CodeGenerator,
  schema: AnyOfSchema,
  path: OutputPath,
  config: GenerateConfig,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const itemCodeOutputs: CodeGenerationOutput[] = [];
  schema.anyOf.forEach((itemSchema, index) => {
    const itemPath: OutputPath = [...path, `${index}`];
    const itemOutput = applyZodSchema(
      codeGenerator,
      itemSchema,
      itemPath,
      config,
      preventFromAddingComponentRefs
    );
    itemCodeOutputs.push(itemOutput);
  });
  return {
    createCode: referencingContext => {
      const partialUnionCodeRows: string[] = [];
      const unionCodeRows: string[] = [];
      if (!itemCodeOutputs.length) {
        return 'any';
      }
      itemCodeOutputs.forEach(itemCodeOutput => {
        const itemCode = itemCodeOutput.createCode(referencingContext);
        partialUnionCodeRows.push(`${itemCode}.partial()`);
        unionCodeRows.push(`${itemCode}`);
      });
      const partialUnionCode = `z.union([${partialUnionCodeRows.join(',')}])`;
      const unionCode = `z.union([${unionCodeRows.join(',')}])`;
      return `z.intersection(${partialUnionCode}, ${unionCode})`;
    },
    path,
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [templateZOfZodLibrary.path];
      itemCodeOutputs.forEach(itemCodeOutput => {
        itemCodeOutput.getRequiredOutputPaths().forEach(outputPath => {
          if (!containsOutputPath(outputPaths, outputPath)) {
            outputPaths.push(outputPath);
          }
        });
      });
      return outputPaths;
    },
  };
}
