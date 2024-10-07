import {
  arraySchemaItemOutputPathPart,
  CodeGenerationOutput,
  CodeGenerator,
  ComponentRefOutput,
  containsOutputPath,
  Context,
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

export function applySchema(
  codeGenerator: CodeGenerator,
  schema: Schema,
  path: OutputPath,
  ctx: Context,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  if (isSchemaComponentRef(schema)) {
    return applyComponentRefSchema(
      codeGenerator,
      schema,
      path,
      ctx,
      preventFromAddingComponentRefs
    );
  }
  if (isBooleanSchema(schema)) {
    return applyBooleanSchema(schema, path);
  }
  if (isStringSchema(schema)) {
    return applyStringSchema(schema, path);
  }
  if (isNumberSchema(schema)) {
    return applyNumberSchema(schema, path);
  }
  if (isIntegerSchema(schema)) {
    return applyIntegerSchema(schema, path);
  }
  if (isArraySchema(schema)) {
    return applyArraySchema(
      codeGenerator,
      schema,
      path,
      ctx,
      preventFromAddingComponentRefs
    );
  }
  if (isObjectSchema(schema)) {
    return applyObjectSchema(
      codeGenerator,
      schema,
      path,
      ctx,
      preventFromAddingComponentRefs
    );
  }
  if (isOneOfSchema(schema)) {
    return applyOneOfSchema(
      codeGenerator,
      schema,
      path,
      ctx,
      preventFromAddingComponentRefs
    );
  }
  if (isAllOfSchema(schema)) {
    return applyAllOfSchema(
      codeGenerator,
      schema,
      path,
      ctx,
      preventFromAddingComponentRefs
    );
  }
  if (isAnyOfSchema(schema)) {
    return applyAnyOfSchema(
      codeGenerator,
      schema,
      path,
      ctx,
      preventFromAddingComponentRefs
    );
  }
  if (isNotSchema(schema)) {
    return applyNotSchema(
      codeGenerator,
      schema,
      path,
      ctx,
      preventFromAddingComponentRefs
    );
  }
  throw new Error(`schema not supported: ${JSON.stringify(schema)}`);
}

function applyBooleanSchema(
  schema: BooleanSchema,
  path: OutputPath
): CodeGenerationOutput {
  return {
    createCode: () => {
      let code = 'boolean';
      if (schema.nullable) {
        code = `null | ${code}`;
      }
      return code;
    },
    path,
    getRequiredOutputPaths: () => [],
  };
}

function applyStringSchema(
  schema: StringSchema,
  path: OutputPath
): CodeGenerationOutput {
  let codeComment: undefined | string = undefined;
  if (schema.format) {
    codeComment = schema.format;
  }
  return {
    createCode: () => {
      let code = '';
      if (schema.enum && schema.enum.length > 0) {
        code += `'${schema.enum.join("' | '")}'`;
      } else if (schema.format === 'binary') {
        code += 'Blob | any';
      } else {
        code += 'string';
      }
      if (schema.nullable) {
        code += ' | null';
      }
      return code;
    },
    path,
    getRequiredOutputPaths: () => [],
    codeComment,
  };
}

function applyArraySchema(
  codeGenerator: CodeGenerator,
  schema: ArraySchema,
  path: OutputPath,
  ctx: Context,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const requiredOutputPaths: OutputPath[] = [];
  const itemOutputPath = [...path, arraySchemaItemOutputPathPart];
  const itemSummary = applySchema(
    codeGenerator,
    schema.items,
    itemOutputPath,
    ctx,
    preventFromAddingComponentRefs
  );
  requiredOutputPaths.push(itemOutputPath);
  const codeComment = itemSummary.codeComment
    ? `item: ${itemSummary.codeComment}`
    : undefined;
  return {
    createCode: () => {
      let code = `(\n${itemSummary.createCode(itemOutputPath)}\n)[]`;
      if (schema.nullable) {
        code += ' | null';
      }
      return code;
    },
    codeComment,
    path,
    getRequiredOutputPaths: () => requiredOutputPaths,
  };
}

function applyNumberSchema(
  schema: NumberSchema,
  path: OutputPath
): CodeGenerationOutput {
  return {
    createCode: () => {
      let code = 'number';
      if (schema.nullable) {
        code = `null | ${code}`;
      }
      return code;
    },
    path,
    getRequiredOutputPaths: () => [],
  };
}

function applyIntegerSchema(
  schema: IntegerSchema,
  path: OutputPath
): CodeGenerationOutput {
  return {
    createCode: () => {
      let code = 'number';
      if (schema.nullable) {
        code = `null | ${code}`;
      }
      return code;
    },
    codeComment: 'int',
    path,
    getRequiredOutputPaths: () => [],
  };
}

export function applyComponentRefSchema(
  codeGenerator: CodeGenerator,
  schema: SchemaComponentRef,
  path: OutputPath,
  ctx: Context,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const output: ComponentRefOutput = {
    type: OutputType.COMPONENT_REF,
    createName: referencingPath => {
      return codeGenerator.createComponentNameForType(
        schema.$ref,
        referencingPath
      );
    },
    componentRef: schema.$ref,
    path,
    getRequiredOutputPaths: () => [
      codeGenerator.createOutputPathByComponentRefForType(schema.$ref),
    ],
  };
  codeGenerator.addOutput(output, ctx, preventFromAddingComponentRefs);
  return {
    ...output,
    createCode: referencingPath =>
      codeGenerator.createComponentNameForType(schema.$ref, referencingPath),
  };
}

export function applyObjectSchema(
  codeGenerator: CodeGenerator,
  schema: ObjectSchema,
  path: OutputPath,
  ctx: Context,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const directOutputByPropNameMap: {
    [propName: string]: {
      createCode: CreateCodeFunc;
      codeComment?: string;
    };
  } = {};
  const requiredOutputPaths: OutputPath[] = [];
  for (const propName in schema.properties) {
    const propSchema = schema.properties[propName];
    const propSchemaPath = [...path, propName];
    requiredOutputPaths.push(propSchemaPath);
    directOutputByPropNameMap[propName] = applySchema(
      codeGenerator,
      propSchema,
      propSchemaPath,
      ctx,
      preventFromAddingComponentRefs
    );
  }
  let additionalPropertiesDirectOutput: undefined | CodeGenerationOutput;
  if (schema.additionalProperties) {
    additionalPropertiesDirectOutput = applySchema(
      codeGenerator,
      schema.additionalProperties,
      [...path, objectSchemaAdditionalPropsOutputPathPart],
      ctx,
      preventFromAddingComponentRefs
    );
  }
  return {
    createCode: () => {
      const codeRows: string[] = [];
      for (const propName in directOutputByPropNameMap) {
        const directOutput = directOutputByPropNameMap[propName];
        const questionMark = !schema.required?.includes(propName) ? '?' : '';
        const propComment = directOutput.codeComment
          ? ` // ${directOutput.codeComment}`
          : '';
        codeRows.push(
          `'${propName}'${questionMark}: ${directOutput.createCode(
            path
          )};${propComment}`
        );
      }
      if (additionalPropertiesDirectOutput) {
        const propComment = additionalPropertiesDirectOutput.codeComment
          ? ` // ${additionalPropertiesDirectOutput.codeComment}`
          : '';
        codeRows.push(
          `[key: string]: ${additionalPropertiesDirectOutput.createCode(
            path
          )};${propComment}`
        );
      }
      let code = `{\n${codeRows.join('\n')}\n}`;
      if (schema.nullable) {
        code += ' | null';
      }
      return code;
    },
    path,
    getRequiredOutputPaths: () => requiredOutputPaths,
  };
}

function applyOneOfSchema(
  codeGenerator: CodeGenerator,
  schema: OneOfSchema,
  path: OutputPath,
  ctx: Context,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const itemCodeOutputs: CodeGenerationOutput[] = [];
  schema.oneOf.forEach((itemSchema, index) => {
    const itemPath: OutputPath = [...path, `${index}`];
    const itemOutput = applySchema(
      codeGenerator,
      itemSchema,
      itemPath,
      ctx,
      preventFromAddingComponentRefs
    );
    itemCodeOutputs.push(itemOutput);
  });
  return {
    createCode: referencingContext => {
      const codeRows: string[] = [];
      itemCodeOutputs.forEach(itemCodeOutput => {
        const itemComment = itemCodeOutput.codeComment
          ? ` // ${itemCodeOutput.codeComment}`
          : '';
        codeRows.push(
          `${itemCodeOutput.createCode(referencingContext)}${itemComment}`
        );
      });
      return `${codeRows.join('\n|')}`;
    },
    path,
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
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

function applyAllOfSchema(
  codeGenerator: CodeGenerator,
  schema: AllOfSchema,
  path: OutputPath,
  ctx: Context,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const itemCodeOutputs: CodeGenerationOutput[] = [];
  schema.allOf.forEach((itemSchema: Schema, index) => {
    if (!isSchema(itemSchema)) {
      return;
    }
    const itemPath: OutputPath = [...path, `${index}`];
    const itemOutput = applySchema(
      codeGenerator,
      itemSchema,
      itemPath,
      ctx,
      preventFromAddingComponentRefs
    );
    itemCodeOutputs.push(itemOutput);
  });
  return {
    createCode: referencingContext => {
      const codeRows: string[] = [];
      itemCodeOutputs.forEach(itemCodeOutput => {
        const itemComment = itemCodeOutput.codeComment
          ? ` // ${itemCodeOutput.codeComment}`
          : '';
        codeRows.push(
          `${itemCodeOutput.createCode(referencingContext)}${itemComment}`
        );
      });
      return `${codeRows.join('\n&')}`;
    },
    path,
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
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

function applyAnyOfSchema(
  codeGenerator: CodeGenerator,
  schema: AnyOfSchema,
  path: OutputPath,
  ctx: Context,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const itemCodeOutputs: CodeGenerationOutput[] = [];
  schema.anyOf.forEach((itemSchema, index) => {
    const itemPath: OutputPath = [...path, `${index}`];
    const itemOutput = applySchema(
      codeGenerator,
      itemSchema,
      itemPath,
      ctx,
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
        const itemComment = itemCodeOutput.codeComment
          ? ` // ${itemCodeOutput.codeComment}`
          : '';
        const itemCode = itemCodeOutput.createCode(referencingContext);
        partialUnionCodeRows.push(`Partial<${itemCode}>`);
        unionCodeRows.push(`${itemCode}${itemComment}`);
      });
      return `(${partialUnionCodeRows.join('\n| ')}\n) & (${unionCodeRows.join('\n| ')}\n)`;
    },
    path,
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
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

function applyNotSchema(
  _codeGenerator: CodeGenerator,
  _schema: NotSchema,
  path: OutputPath,
  _ctx: Context,
  _preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  return {
    createCode: () => {
      return 'any';
    },
    path,
    getRequiredOutputPaths: () => [],
  };
}
