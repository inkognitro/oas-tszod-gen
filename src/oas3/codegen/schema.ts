import {
  CodeGenerationOutput,
  CodeGenerator,
  ComponentRefOutput,
  containsOutputPath,
  Context,
  CreateCodeFunc,
  OutputPath,
  OutputType,
} from './core';
import {
  AllOfSchema,
  AnyOfSchema,
  ArraySchema,
  BooleanSchema,
  findConcreteSchema,
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
    return applySchemaComponentRef(
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
  const itemOutputPath = [...path, 'item'];
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

export function applySchemaComponentRef(
  codeGenerator: CodeGenerator,
  schema: SchemaComponentRef,
  path: OutputPath,
  ctx: Context,
  preventFromAddingComponentRefs: string[] = []
): CodeGenerationOutput {
  const output: ComponentRefOutput = {
    type: OutputType.COMPONENT_REF,
    createName: referencingPath => {
      return codeGenerator.createSchemaComponentTypeName(
        schema.$ref,
        referencingPath,
        ctx
      );
    },
    componentRef: schema.$ref,
    path,
    getRequiredOutputPaths: () => [
      codeGenerator.createSchemaComponentTypeOutputPath(schema.$ref, ctx),
    ],
  };
  codeGenerator.addOutput(output, ctx, preventFromAddingComponentRefs);
  return {
    ...output,
    createCode: referencingPath =>
      codeGenerator.createSchemaComponentTypeName(
        schema.$ref,
        referencingPath,
        ctx
      ),
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
      [...path, 'additionalProps'],
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
  type ItemResult = {
    codeOutput: CodeGenerationOutput;
    hasObjectProperties: boolean;
  };
  const itemResults: ItemResult[] = [];
  schema.anyOf.forEach((itemSchema, index) => {
    const itemPath: OutputPath = [...path, `${index}`];
    const itemOutput = applySchema(
      codeGenerator,
      itemSchema,
      itemPath,
      ctx,
      preventFromAddingComponentRefs
    );
    const concreteSchema = findConcreteSchema(
      codeGenerator.getSpecification(),
      itemSchema
    );
    itemResults.push({
      codeOutput: itemOutput,
      hasObjectProperties:
        isObjectSchema(concreteSchema) &&
        !!concreteSchema.properties &&
        !!Object.keys(concreteSchema.properties).length,
    });
  });
  return {
    createCode: referencingContext => {
      const partialUnionItemCodes: string[] = [];
      const unionItemCodes: string[] = [];
      if (!itemResults.length) {
        return 'any';
      }
      itemResults.forEach(itemResult => {
        const itemCode = itemResult.codeOutput.createCode(referencingContext);
        if (itemResult.hasObjectProperties) {
          partialUnionItemCodes.push(`Partial<${itemCode}>`);
        }
        unionItemCodes.push(`${itemCode}`);
      });
      const unionCode =
        unionItemCodes.length === 1
          ? unionItemCodes[0]
          : `(\n${unionItemCodes.join('\n| ')}\n)`;
      if (!partialUnionItemCodes.length) {
        return unionCode;
      }
      const partialUnionCode =
        partialUnionItemCodes.length === 1
          ? partialUnionItemCodes[0]
          : `(\n${partialUnionItemCodes.join('\n& ')}\n)`;
      return `${unionCode} & ${partialUnionCode}`;
    },
    path,
    getRequiredOutputPaths: () => {
      const outputPaths: OutputPath[] = [];
      itemResults.forEach(itemCodeOutput => {
        itemCodeOutput.codeOutput
          .getRequiredOutputPaths()
          .forEach(outputPath => {
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
