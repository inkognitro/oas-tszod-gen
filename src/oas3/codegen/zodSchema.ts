import {
  CodeGenerationOutput,
  CodeGenerator,
  ComponentRefOutput,
  containsOutputPath,
  Context,
  OutputPath,
  OutputType,
} from './core';
import {
  AllOfSchema,
  AnyOfSchema,
  ArraySchema,
  BooleanSchema,
  IntegerSchema,
  isAllOfSchema,
  isAnyOfSchema,
  isArraySchema,
  isBooleanSchema,
  isIntegerSchema,
  isNotSchema,
  isNumberSchema,
  isObjectSchema,
  isOneOfSchema,
  isSchema,
  isSchemaComponentRef,
  isStringSchema,
  NotSchema,
  NumberSchema,
  ObjectSchema,
  OneOfSchema,
  Schema,
  SchemaComponentRef,
  StringSchema,
} from '@/oas3/specification';
import {templateZOfZodLibrary} from './template';

type ZodSchemaCodeGenerationOutput = CodeGenerationOutput & {
  referencesRecursiveComponents: () => boolean;
};

export function applyZodSchema(
  codeGenerator: CodeGenerator,
  schema: Schema,
  path: OutputPath,
  ctx: Context
): ZodSchemaCodeGenerationOutput {
  if (isSchemaComponentRef(schema)) {
    return applyZodComponentRefSchema(codeGenerator, schema, path, ctx);
  }
  if (isBooleanSchema(schema)) {
    return applyZodBooleanSchema(schema, path);
  }
  if (isStringSchema(schema)) {
    return applyZodStringSchema(schema, path, ctx);
  }
  if (isNumberSchema(schema)) {
    return applyZodNumberSchema(schema, path);
  }
  if (isIntegerSchema(schema)) {
    return applyZodIntegerSchema(schema, path);
  }
  if (isArraySchema(schema)) {
    return applyZodArraySchema(codeGenerator, schema, path, ctx);
  }
  if (isObjectSchema(schema)) {
    return applyZodObjectSchema(codeGenerator, schema, path, ctx);
  }
  if (isOneOfSchema(schema)) {
    return applyZodOneOfSchema(codeGenerator, schema, path, ctx);
  }
  if (isAllOfSchema(schema)) {
    return applyZodAllOfSchema(codeGenerator, schema, path, ctx);
  }
  if (isAnyOfSchema(schema)) {
    return applyZodAnyOfSchema(codeGenerator, schema, path, ctx);
  }
  if (isNotSchema(schema)) {
    return applyNotSchema(codeGenerator, schema, path, ctx);
  }
  throw new Error(`schema not supported: ${JSON.stringify(schema)}`);
}

function applyZodBooleanSchema(
  schema: BooleanSchema,
  path: OutputPath
): ZodSchemaCodeGenerationOutput {
  return {
    createCode: () => {
      let code = 'z.boolean()';
      if (schema.nullable) {
        code += '.nullable()';
      }
      return code;
    },
    path,
    referencesRecursiveComponents: () => false,
    getRequiredOutputPaths: () => [templateZOfZodLibrary.path],
  };
}

function applyZodStringSchema(
  schema: StringSchema,
  path: OutputPath,
  ctx: Context
): ZodSchemaCodeGenerationOutput {
  let codeComment: undefined | string;
  return {
    createCode: () => {
      let code = '';
      if (schema.enum) {
        if (!schema.enum.length) {
          code += 'z.enum([])';
        } else {
          code += `z.enum(['${schema.enum.map(e => e.replaceAll("'", "\\'")).join("', '")}'])`;
        }
      } else if (schema.format === 'binary') {
        code += 'z.any()';
      } else {
        code += 'z.string()';
        let pattern: string | null = null;
        if (schema.format && ctx.config.findCustomStringPatternByFormat) {
          pattern = ctx.config.findCustomStringPatternByFormat(schema.format);
        }
        if (!pattern && schema.pattern) {
          pattern = schema.pattern;
        }
        if (pattern) {
          code += `.regex(/${pattern.replace(/[/.*+\-?^${}()|[\]\\]/g, '\\$&')}/)`;
        }
        if (!schema.enum && !pattern && schema.format) {
          switch (schema.format) {
            case 'uuid':
              code += '.uuid()';
              break;
            case 'date':
              code += '.date()';
              break;
            case 'time':
              code += '.time()';
              break;
            case 'duration':
              code += '.duration()';
              break;
            case 'date-time':
              code += '.datetime()';
              break;
            case 'email':
              code += '.email()';
              break;
            case 'url':
              code += '.url()';
              break;
            case 'ip':
            case 'ipv4':
            case 'ipv6':
              code += '.ip()';
              break;
            case 'emoji':
              code += '.emoji()';
              break;
            default:
              codeComment = schema.format;
          }
        }
      }
      if (schema.nullable) {
        code += '.nullable()';
      }
      return code;
    },
    path,
    referencesRecursiveComponents: () => false,
    getRequiredOutputPaths: () => [templateZOfZodLibrary.path],
    codeComment,
  };
}

function applyZodArraySchema(
  codeGenerator: CodeGenerator,
  schema: ArraySchema,
  path: OutputPath,
  ctx: Context
): ZodSchemaCodeGenerationOutput {
  const requiredOutputPaths: OutputPath[] = [templateZOfZodLibrary.path];
  const itemOutputPath = [...path, 'item'];
  const itemSummary = applyZodSchema(
    codeGenerator,
    schema.items,
    itemOutputPath,
    ctx
  );
  requiredOutputPaths.push(itemOutputPath);
  const codeComment = itemSummary.codeComment
    ? `item: ${itemSummary.codeComment}`
    : undefined;
  return {
    createCode: () => {
      const parts = [`z.array(${itemSummary.createCode(itemOutputPath)})`];
      if (schema.minItems) {
        parts.push(`.min(${schema.minItems})`);
      }
      if (schema.maxItems) {
        parts.push(`.min(${schema.maxItems})`);
      }
      if (schema.nullable) {
        parts.push('.nullable()');
      }
      return parts.join('');
    },
    codeComment,
    path,
    referencesRecursiveComponents: () =>
      itemSummary.referencesRecursiveComponents(),
    getRequiredOutputPaths: () => requiredOutputPaths,
  };
}

function applyZodNumberSchema(
  schema: NumberSchema,
  path: OutputPath
): ZodSchemaCodeGenerationOutput {
  return {
    createCode: () => {
      let code = 'z.number().safe().finite()';
      if (schema.minimum !== undefined) {
        code += `.gte(${schema.minimum})`;
      } else if (schema.exclusiveMinimum !== undefined) {
        code += `.gt(${schema.exclusiveMinimum})`;
      }
      if (schema.maximum !== undefined) {
        code += `.lte(${schema.maximum})`;
      } else if (schema.exclusiveMinimum !== undefined) {
        code += `.lt(${schema.exclusiveMinimum})`;
      }
      if (schema.multipleOf !== undefined) {
        code += `multipleOf(${schema.multipleOf})`;
      }
      if (schema.nullable) {
        code += '.nullable()';
      }
      return code;
    },
    path,
    referencesRecursiveComponents: () => false,
    getRequiredOutputPaths: () => [templateZOfZodLibrary.path],
  };
}

function applyZodIntegerSchema(
  schema: IntegerSchema,
  path: OutputPath
): ZodSchemaCodeGenerationOutput {
  return {
    createCode: () => {
      let code = 'z.number().int().safe().finite()';
      if (schema.minimum !== undefined) {
        code += `.gte(${schema.minimum})`;
      } else if (schema.exclusiveMinimum !== undefined) {
        code += `.gt(${schema.exclusiveMinimum})`;
      }
      if (schema.maximum !== undefined) {
        code += `.lte(${schema.maximum})`;
      } else if (schema.exclusiveMinimum !== undefined) {
        code += `.lt(${schema.exclusiveMinimum})`;
      }
      if (schema.multipleOf !== undefined) {
        code += `multipleOf(${schema.multipleOf})`;
      }
      if (schema.nullable) {
        code += '.nullable()';
      }
      return code;
    },
    path,
    referencesRecursiveComponents: () => false,
    getRequiredOutputPaths: () => [templateZOfZodLibrary.path],
  };
}

export function applyZodComponentRefSchema(
  codeGenerator: CodeGenerator,
  schema: SchemaComponentRef,
  path: OutputPath,
  ctx: Context
): ZodSchemaCodeGenerationOutput {
  const output: ComponentRefOutput = {
    type: OutputType.COMPONENT_REF,
    createName: referencingPath => {
      return codeGenerator.createSchemaComponentZodConstName(
        schema.$ref,
        referencingPath,
        ctx
      );
    },
    componentRef: schema.$ref,
    path,
    getRequiredOutputPaths: () => [
      codeGenerator.createSchemaComponentZodConstOutputPath(schema.$ref, ctx),
    ],
  };
  codeGenerator.addOutput(output, ctx);
  const isRecursive = ctx.preventFromAddingComponentRefs.includes(schema.$ref);
  return {
    ...output,
    createCode: referencingPath => {
      const constName = codeGenerator.createSchemaComponentZodConstName(
        schema.$ref,
        referencingPath,
        ctx
      );
      if (isRecursive) {
        return `z.lazy(() => ${constName})`;
      }
      return constName;
    },
    referencesRecursiveComponents: () => {
      return isRecursive;
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
  ctx: Context
): ZodSchemaCodeGenerationOutput {
  const directOutputByPropNameMap: {
    [propName: string]: ZodSchemaCodeGenerationOutput;
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
      ctx
    );
  }
  let additionalPropertiesDirectOutput: undefined | CodeGenerationOutput;
  if (schema.additionalProperties) {
    additionalPropertiesDirectOutput = applyZodSchema(
      codeGenerator,
      schema.additionalProperties,
      [...path, 'additionalProps'],
      ctx
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
        let code = `z.record(${additionalPropertiesDirectOutput.createCode(path)})`;
        if (schema.nullable) {
          code += '.nullable()';
        }
        return code;
      }
      let zodAdditionalPropsCode = '';
      if (additionalPropertiesDirectOutput) {
        zodAdditionalPropsCode = `.catchall(${additionalPropertiesDirectOutput.createCode(path)})`;
      }
      let code = `z.object({\n${codeRows.join('\n')}\n})${zodAdditionalPropsCode}`;
      if (schema.nullable) {
        code += '.nullable()';
      }
      return code;
    },
    path,
    referencesRecursiveComponents: () => {
      for (const key in directOutputByPropNameMap) {
        const codeOutput = directOutputByPropNameMap[key];
        if (codeOutput.referencesRecursiveComponents()) {
          return true;
        }
      }
      return false;
    },
    getRequiredOutputPaths: () => requiredOutputPaths,
  };
}

function applyZodOneOfSchema(
  codeGenerator: CodeGenerator,
  schema: OneOfSchema,
  path: OutputPath,
  ctx: Context
): ZodSchemaCodeGenerationOutput {
  const itemCodeOutputs: ZodSchemaCodeGenerationOutput[] = [];
  schema.oneOf.forEach((itemSchema, index) => {
    const itemPath: OutputPath = [...path, `${index}`];
    const itemOutput = applyZodSchema(codeGenerator, itemSchema, itemPath, ctx);
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
    referencesRecursiveComponents: () => {
      return !!itemCodeOutputs.find(o => o.referencesRecursiveComponents());
    },
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
  ctx: Context
): ZodSchemaCodeGenerationOutput {
  const itemCodeOutputs: ZodSchemaCodeGenerationOutput[] = [];
  schema.allOf.forEach((itemSchema, index) => {
    if (!isSchema(itemSchema)) {
      return;
    }
    const itemPath: OutputPath = [...path, `${index}`];
    const itemOutput = applyZodSchema(codeGenerator, itemSchema, itemPath, ctx);
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
      return `z.intersection(${codeRows.join(',')})`;
    },
    path,
    referencesRecursiveComponents: () => {
      return !!itemCodeOutputs.find(o => o.referencesRecursiveComponents());
    },
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
  ctx: Context
): ZodSchemaCodeGenerationOutput {
  const itemResults: ZodSchemaCodeGenerationOutput[] = [];
  schema.anyOf.forEach((itemSchema, index) => {
    const itemPath: OutputPath = [...path, `${index}`];
    const itemOutput = applyZodSchema(codeGenerator, itemSchema, itemPath, ctx);
    itemResults.push(itemOutput);
  });
  return {
    createCode: referencingContext => {
      const itemCodes: string[] = [];
      if (!itemResults.length) {
        return 'z.any()';
      }
      itemResults.forEach(itemResult => {
        itemCodes.push(itemResult.createCode(referencingContext));
      });
      return itemCodes.length === 1
        ? itemCodes[0]
        : `z.union([\n${itemCodes.join(',\n')}\n])`;
    },
    path,
    referencesRecursiveComponents: () => {
      return !!itemResults.find(o => o.referencesRecursiveComponents());
    },
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [templateZOfZodLibrary.path];
      itemResults.forEach(itemCodeOutput => {
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

function applyNotSchema(
  _codeGenerator: CodeGenerator,
  _schema: NotSchema,
  path: OutputPath,
  _ctx: Context
): ZodSchemaCodeGenerationOutput {
  return {
    createCode: () => {
      return 'z.any()';
    },
    path,
    referencesRecursiveComponents: () => false,
    getRequiredOutputPaths: () => [templateZOfZodLibrary.path],
  };
}
