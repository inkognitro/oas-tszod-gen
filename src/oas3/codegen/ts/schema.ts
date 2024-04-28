import {
  CreateCodeFunc,
  CodeGenerationOutput,
  ObjectDiscriminatorConfig,
  OutputType,
  OutputPath,
  arraySchemaItemOutputPathPart,
  oneOfSchemaItemOutputPathPart,
  objectSchemaAdditionalPropsOutputPathPart,
  CodeGenerator,
  DefinitionOutput,
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
  isComponentRef,
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
      undefined,
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
      undefined,
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
  let code = 'boolean';
  if (schema.nullable) {
    code = `null | ${code}`;
  }
  return {
    createCode: () => {
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
  let code = 'string';
  if (schema.enum && schema.enum.length > 0) {
    code = `'${schema.enum.join("' | '")}'`;
  } else if (schema.format === 'binary') {
    code = 'any';
  }
  if (schema.nullable) {
    code = `null | ${code}`;
  }
  if (schema.format) {
    codeComment = schema.format;
  }
  return {
    createCode: () => {
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
  let codeComment: undefined | string = undefined;
  let code = 'number';
  if (schema.nullable) {
    code = `null | ${code}`;
  }
  if (schema.format) {
    codeComment = schema.format;
  }
  return {
    createCode: () => {
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
  let code = 'number';
  if (schema.nullable) {
    code = `null | ${code}`;
  }
  return {
    createCode: () => {
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
  objectDiscriminatorConfig?: ObjectDiscriminatorConfig,
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
      objectDiscriminatorConfig,
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
  discriminatorConfig?: ObjectDiscriminatorConfig,
  preventFromAddingTypesForComponentRefs: string[] = []
): CodeGenerationOutput {
  const directOutputByPropNameMap: {
    [propName: string]: {
      createCode: CreateCodeFunc;
      codeComment?: string;
    };
  } = {};
  const requiredOutputPaths: OutputPath[] = discriminatorConfig
    ? [...discriminatorConfig.requiredOutputPaths]
    : [];
  for (const propName in schema.properties) {
    const propSchema = schema.properties[propName];
    const propSchemaPath = [...path, propName];
    requiredOutputPaths.push(propSchemaPath);
    if (discriminatorConfig && propName === discriminatorConfig.propName) {
      directOutputByPropNameMap[propName] = discriminatorConfig;
      continue;
    }
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
    createCode: referencingContext => {
      const codeRows: string[] = [];
      for (const propName in directOutputByPropNameMap) {
        const directOutput = directOutputByPropNameMap[propName];
        const isDiscriminatorProp =
          discriminatorConfig && propName === discriminatorConfig.propName;
        const questionMark =
          !schema.required?.includes(propName) && !isDiscriminatorProp
            ? '?'
            : '';
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

function getConcreteSchema(
  schema: Schema,
  codeGenerator: CodeGenerator
): Schema {
  if (!isComponentRef(schema)) {
    return schema;
  }
  const componentSchema = codeGenerator.findComponentSchemaByRef(schema.$ref);
  if (!componentSchema) {
    throw new Error(
      `could not find schema for component with ref "${schema.$ref}"`
    );
  }
  return componentSchema;
}

function getEnumValueFromItemSchema(
  itemSchema: Schema,
  discriminatorPropName: string,
  codeGenerator: CodeGenerator
): string {
  const concreteItemSchema = getConcreteSchema(itemSchema, codeGenerator);
  if (!isObjectSchema(concreteItemSchema)) {
    throw new Error(
      `every underlying itemSchema of a oneOfSchema with discriminator, must be a ObjectSchema, but following was given: ${JSON.stringify(
        concreteItemSchema
      )}`
    );
  }
  const discriminatorSchema =
    concreteItemSchema.properties[discriminatorPropName];
  const concreteDiscriminatorSchema = getConcreteSchema(
    discriminatorSchema,
    codeGenerator
  );
  if (
    !isStringSchema(concreteDiscriminatorSchema) ||
    concreteDiscriminatorSchema.enum?.length !== 1
  ) {
    throw new Error(
      `only StringSchema with one specific enum value is supported for discriminators, but following schema was given for property "${discriminatorPropName}": ${JSON.stringify(
        concreteItemSchema
      )}`
    );
  }
  return concreteDiscriminatorSchema.enum[0];
}

function isEveryItemSchemaDiscriminatorPropertyAStringSchemaWithOnlyOneValue(
  schemas: Schema[],
  discriminatorPropName: string,
  codeGenerator: CodeGenerator
): boolean {
  for (const index in schemas) {
    const schema = schemas[index];
    const concreteSchema = getConcreteSchema(schema, codeGenerator);
    if (!isObjectSchema(concreteSchema)) {
      return false;
    }
    const discriminatorPropSchema =
      concreteSchema.properties[discriminatorPropName];
    if (!isStringSchema(discriminatorPropSchema)) {
      return false;
    }
    if (discriminatorPropSchema.enum?.length !== 1) {
      return false;
    }
  }
  return true;
}

function createNullableDiscriminatorEnumDefinitionOutput(
  oneOfSchema: OneOfSchema,
  path: OutputPath,
  codeGenerator: CodeGenerator
): null | DefinitionOutput {
  const discriminatorPropName = oneOfSchema.discriminator?.propertyName;
  if (!discriminatorPropName) {
    return null;
  }
  if (
    !isEveryItemSchemaDiscriminatorPropertyAStringSchemaWithOnlyOneValue(
      oneOfSchema.oneOf,
      discriminatorPropName,
      codeGenerator
    )
  ) {
    return null;
  }
  if (
    !doesEveryItemSchemaDiscriminatorPropertyLiveInTheSameFileContext(
      oneOfSchema.oneOf,
      path,
      codeGenerator,
      discriminatorPropName
    )
  ) {
    return null;
  }
  const enumParts: string[] = [];
  oneOfSchema.oneOf.forEach(itemSchema => {
    enumParts.push(
      getEnumValueFromItemSchema(
        itemSchema,
        discriminatorPropName,
        codeGenerator
      )
    );
  });
  const enumsCodeLines: string[] = [];
  enumParts.forEach(entryName => {
    enumsCodeLines.push(`${entryName} = "${entryName}"`);
  });
  const enumOutputPath = [...path, discriminatorPropName];
  return {
    type: OutputType.DEFINITION,
    definitionType: 'enum',
    createName: (referencingPath: OutputPath) => {
      return codeGenerator.createEnumName(enumOutputPath, referencingPath);
    },
    createCode: () => `{\n${enumsCodeLines.join(',\n')}\n}`,
    path: enumOutputPath,
    requiredOutputPaths: [],
  };
}

function doesEveryItemSchemaDiscriminatorPropertyLiveInTheSameFileContext(
  itemSchemas: Schema[],
  path: OutputPath,
  codeGenerator: CodeGenerator,
  discriminatorPropName: string
): boolean {
  let previousSchemaOutputPath: OutputPath | null = null;
  for (const index in itemSchemas) {
    const schema = itemSchemas[index];
    const itemSchemaOutputPath: OutputPath = [
      ...path,
      oneOfSchemaItemOutputPathPart,
      getEnumValueFromItemSchema(schema, discriminatorPropName, codeGenerator),
    ];
    if (!previousSchemaOutputPath) {
      previousSchemaOutputPath = itemSchemaOutputPath;
      continue;
    }
    if (
      !codeGenerator.hasSameFileContext(
        previousSchemaOutputPath,
        itemSchemaOutputPath
      )
    ) {
      return false;
    }
  }
  return true;
}

export function applyOneOfSchema(
  codeGenerator: CodeGenerator,
  schema: OneOfSchema,
  path: OutputPath,
  preventFromAddingTypesForComponentRefs: string[] = []
): CodeGenerationOutput {
  const enumOutput = createNullableDiscriminatorEnumDefinitionOutput(
    schema,
    path,
    codeGenerator
  );
  if (enumOutput) {
    codeGenerator.addOutput(enumOutput);
  }
  const oneOfItemDirectOutputs: CodeGenerationOutput[] = [];
  const requiredOutputPaths: OutputPath[] = [];
  schema.oneOf.forEach((itemSchema, index) => {
    let itemOutput: undefined | CodeGenerationOutput;
    if (enumOutput) {
      const discriminatorPropName = schema.discriminator?.propertyName;
      if (!discriminatorPropName) {
        throw new Error('this case should never happen');
      }
      const enumValue = getEnumValueFromItemSchema(
        itemSchema,
        discriminatorPropName,
        codeGenerator
      );
      const itemPath: OutputPath = [
        ...path,
        oneOfSchemaItemOutputPathPart,
        enumValue,
      ];
      requiredOutputPaths.push(itemPath);
      const objectDiscriminatorConfig: ObjectDiscriminatorConfig = {
        requiredOutputPaths: [enumOutput.path],
        propName: discriminatorPropName,
        createCode: referencingContext => {
          const enumTypeName = enumOutput.createName(referencingContext);
          return `${enumTypeName}.${enumValue}`;
        },
      };
      if (isObjectSchema(itemSchema)) {
        itemOutput = applyObjectSchema(
          codeGenerator,
          itemSchema,
          itemPath,
          objectDiscriminatorConfig,
          preventFromAddingTypesForComponentRefs
        );
      } else if (isSchemaComponentRef(itemSchema)) {
        itemOutput = applyComponentRefSchema(
          codeGenerator,
          itemSchema,
          itemPath,
          objectDiscriminatorConfig,
          preventFromAddingTypesForComponentRefs
        );
      } else {
        throw new Error(
          `oneOf with defined discriminator.propertyName "${discriminatorPropName}" must only contain objectSchema, but following schema was given: ${JSON.stringify(
            itemSchema
          )}`
        );
      }
      oneOfItemDirectOutputs.push(itemOutput);
    }
    if (!itemOutput) {
      const itemPath: OutputPath = [
        ...path,
        oneOfSchemaItemOutputPathPart,
        `${index}`,
      ];
      requiredOutputPaths.push(itemPath);
      itemOutput = applySchema(
        codeGenerator,
        itemSchema,
        itemPath,
        preventFromAddingTypesForComponentRefs
      );
      oneOfItemDirectOutputs.push(itemOutput);
    }
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
