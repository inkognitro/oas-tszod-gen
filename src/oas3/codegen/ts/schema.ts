import {
  arraySchemaItemOutputPathPart,
  CodeGenerationOutput,
  CodeGenerator,
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

export function applySchema(
  codeGenerator: CodeGenerator,
  schema: Schema,
  path: OutputPath,
  preventFromAddingTypesForComponentRefs: string[] = []
): CodeGenerationOutput {
  if (isSchemaComponentRef(schema)) {
    return applyComponentRefSchema(
      codeGenerator,
      schema,
      path,
      preventFromAddingTypesForComponentRefs
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
      preventFromAddingTypesForComponentRefs
    );
  }
  if (isObjectSchema(schema)) {
    return applyObjectSchema(
      codeGenerator,
      schema,
      path,
      preventFromAddingTypesForComponentRefs
    );
  }
  if (isOneOfSchema(schema)) {
    return applyOneOfSchema(
      codeGenerator,
      schema,
      path,
      preventFromAddingTypesForComponentRefs
    );
  }
  if (isAllOfSchema(schema)) {
    return applyAllOfSchema(
      codeGenerator,
      schema,
      path,
      preventFromAddingTypesForComponentRefs
    );
  }
  throw new Error(`schema not supported: ${JSON.stringify(schema)}`);
}

export function applyBooleanSchema(
  schema: BooleanSchema,
  path: OutputPath
): CodeGenerationOutput {
  return {
    createZodCode: () => {
      let code = 'z.boolean()';
      if (schema.nullable) {
        code += '.nullable()';
      }
      return code;
    },
    createCode: () => {
      let code = 'boolean';
      if (schema.nullable) {
        code = `null | ${code}`;
      }
      return code;
    },
    path,
    requiredOutputPaths: [],
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
    createZodCode: () => {
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
      if (schema.nullable) {
        code += '.nullable()';
      }
      return code;
    },
    createCode: () => {
      let code = 'string';
      if (schema.enum && schema.enum.length > 0) {
        code = `'${schema.enum.join("' | '")}'`;
      } else if (schema.format === 'binary') {
        code = 'any';
      }
      if (schema.nullable) {
        code = `null | ${code}`;
      }
      return code;
    },
    path,
    requiredOutputPaths: [],
    codeComment,
  };
}

export function applyArraySchema(
  codeGenerator: CodeGenerator,
  schema: ArraySchema,
  path: OutputPath,
  preventFromAddingTypesForComponentRefs: string[] = []
): CodeGenerationOutput {
  const itemOutputPath = [...path, arraySchemaItemOutputPathPart];
  const itemSummary = applySchema(
    codeGenerator,
    schema.items,
    itemOutputPath,
    preventFromAddingTypesForComponentRefs
  );
  const codeComment = itemSummary.codeComment
    ? `item: ${itemSummary.codeComment}`
    : undefined;
  return {
    createCode: referencingContext => {
      return `(${itemSummary.createCode(referencingContext)})[]`;
    },
    codeComment,
    path,
    requiredOutputPaths: [itemOutputPath],
  };
}

export function applyNumberSchema(
  schema: NumberSchema,
  path: OutputPath
): CodeGenerationOutput {
  const codeComment: undefined | string = undefined;
  return {
    createCode: () => {
      let code = 'number';
      if (schema.nullable) {
        code = `null | ${code}`;
      }
      return code;
    },
    createZodCode: () => {
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
    codeComment,
    path,
    requiredOutputPaths: [],
  };
}

export function applyIntegerSchema(
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
    createZodCode: () => {
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
    codeComment: 'int',
    path,
    requiredOutputPaths: [],
  };
}

export function applyComponentRefSchema(
  codeGenerator: CodeGenerator,
  schema: ComponentRef,
  path: OutputPath,
  preventFromAddingTypesForComponentRefs: string[] = []
): CodeGenerationOutput {
  codeGenerator.addOutput(
    {
      type: OutputType.COMPONENT_REF,
      createName: referencingPath => {
        return codeGenerator.createComponentTypeName(
          schema.$ref,
          referencingPath
        );
      },
      componentRef: schema.$ref,
      path,
      requiredOutputPaths: [
        codeGenerator.createOutputPathByComponentRef(schema.$ref),
      ],
    },
    preventFromAddingTypesForComponentRefs
  );
  return {
    createCode: referencingPath =>
      codeGenerator.createComponentTypeName(schema.$ref, referencingPath),
    path,
    requiredOutputPaths: [
      codeGenerator.createOutputPathByComponentRef(schema.$ref),
    ],
  };
}

export function applyObjectSchema(
  codeGenerator: CodeGenerator,
  schema: ObjectSchema,
  path: OutputPath,
  preventFromAddingTypesForComponentRefs: string[] = []
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
      preventFromAddingTypesForComponentRefs
    );
  }
  let additionalPropertiesDirectOutput: undefined | CodeGenerationOutput;
  if (schema.additionalProperties) {
    additionalPropertiesDirectOutput = applySchema(
      codeGenerator,
      schema.additionalProperties,
      [...path, objectSchemaAdditionalPropsOutputPathPart],
      preventFromAddingTypesForComponentRefs
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
          `${propName}${questionMark}: ${directOutput.createCode(
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

      return `{\n${codeRows.join('\n')}\n}`;
    },
    path,
    requiredOutputPaths,
  };
}

export function applyOneOfSchema(
  codeGenerator: CodeGenerator,
  schema: OneOfSchema,
  path: OutputPath,
  preventFromAddingTypesForComponentRefs: string[] = []
): CodeGenerationOutput {
  const oneOfItemDirectOutputs: CodeGenerationOutput[] = [];
  const requiredOutputPaths: OutputPath[] = [];
  schema.oneOf.forEach((itemSchema, index) => {
    const itemPath: OutputPath = [
      ...path,
      oneOfSchemaItemOutputPathPart,
      `${index}`,
    ];
    requiredOutputPaths.push(itemPath);
    const itemOutput = applySchema(
      codeGenerator,
      itemSchema,
      itemPath,
      preventFromAddingTypesForComponentRefs
    );
    oneOfItemDirectOutputs.push(itemOutput);
  });
  return {
    createCode: referencingContext => {
      const codeParts: string[] = [];
      oneOfItemDirectOutputs.forEach(directOutput => {
        const itemComment = directOutput.codeComment
          ? ` // ${directOutput.codeComment}`
          : '';
        codeParts.push(
          `| ${directOutput.createCode(referencingContext)}${itemComment}`
        );
      });
      return `${codeParts.join('\n')}`;
    },
    path,
    requiredOutputPaths,
  };
}

export function applyAllOfSchema(
  _codeGenerator: CodeGenerator,
  _schema: AllOfSchema,
  path: OutputPath,
  _preventFromAddingTypesForComponentRefs: string[] = []
): CodeGenerationOutput {
  // todo: implement
  return {
    createCode: () => {
      return 'any';
    },
    path,
    requiredOutputPaths: [],
  };
}
