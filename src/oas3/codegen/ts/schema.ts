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

function applyArraySchema(
  codeGenerator: CodeGenerator,
  schema: ArraySchema,
  path: OutputPath,
  preventFromAddingTypesForComponentRefs: string[] = []
): CodeGenerationOutput {
  const requiredOutputPaths: OutputPath[] = [];
  const itemOutputPath = [...path, arraySchemaItemOutputPathPart];
  const itemSummary = applySchema(
    codeGenerator,
    schema.items,
    itemOutputPath,
    preventFromAddingTypesForComponentRefs
  );
  requiredOutputPaths.push(itemOutputPath);
  const codeComment = itemSummary.codeComment
    ? `item: ${itemSummary.codeComment}`
    : undefined;
  return {
    createCode: () => {
      return `(${itemSummary.createCode(itemOutputPath)})[]`;
    },
    codeComment,
    path,
    requiredOutputPaths,
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
    requiredOutputPaths: [],
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
    requiredOutputPaths: [],
  };
}

export function applyComponentRefSchema(
  codeGenerator: CodeGenerator,
  schema: ComponentRef,
  path: OutputPath,
  preventFromAddingTypesForComponentRefs: string[] = []
): CodeGenerationOutput {
  const output: ComponentRefOutput = {
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
  };
  codeGenerator.addOutput(output, preventFromAddingTypesForComponentRefs);
  return {
    ...output,
    createCode: referencingPath =>
      codeGenerator.createComponentTypeName(schema.$ref, referencingPath),
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

function applyOneOfSchema(
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
      const codeRows: string[] = [];
      oneOfItemDirectOutputs.forEach(directOutput => {
        const itemComment = directOutput.codeComment
          ? ` // ${directOutput.codeComment}`
          : '';
        codeRows.push(
          `| ${directOutput.createCode(referencingContext)}${itemComment}`
        );
      });
      return `${codeRows.join('\n')}`;
    },
    path,
    requiredOutputPaths,
  };
}

function applyAllOfSchema(
  _codeGenerator: CodeGenerator,
  _schema: AllOfSchema,
  path: OutputPath,
  _preventFromAddingTypesForComponentRefs: string[] = []
): CodeGenerationOutput {
  const requiredOutputPaths: OutputPath[] = [];
  return {
    createCode: () => 'any',
    path,
    requiredOutputPaths,
  };
}
