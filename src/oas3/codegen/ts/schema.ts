import {
  CreateCodeFunc,
  CodeGenerationOutput,
  ObjectDiscriminatorConfig,
  OutputType,
  OutputPath,
  arraySchemaItemOutputPathPart,
  oneOfSchemaItemOutputPathPart,
  objectSchemaAdditionalPropOutputPathPart,
  CodeGenerator,
  DefinitionOutput,
} from './core';
import {
  ArraySchema,
  BooleanSchema,
  ComponentRef,
  isArraySchema,
  isBooleanSchema,
  isComponentRef,
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
  path: OutputPath
): CodeGenerationOutput {
  if (isSchemaComponentRef(schema)) {
    return applyComponentRefSchema(codeGenerator, schema, path);
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
  if (isArraySchema(schema)) {
    return applyArraySchema(codeGenerator, schema, path);
  }
  if (isObjectSchema(schema)) {
    return applyObjectSchema(codeGenerator, schema, path);
  }
  if (isOneOfSchema(schema)) {
    return applyOneOfSchema(codeGenerator, schema, path);
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
  path: OutputPath
): CodeGenerationOutput {
  const itemOutputPath = [...path, arraySchemaItemOutputPathPart];
  const itemSummary = applySchema(codeGenerator, schema.items, itemOutputPath);
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

export function applyComponentRefSchema(
  codeGenerator: CodeGenerator,
  schema: ComponentRef,
  path: OutputPath,
  objectDiscriminatorConfig?: ObjectDiscriminatorConfig
): CodeGenerationOutput {
  codeGenerator.addOutput({
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
  });
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
  discriminatorConfig?: ObjectDiscriminatorConfig
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
    if (discriminatorConfig && propName === discriminatorConfig.propName) {
      applySchema(codeGenerator, propSchema, propSchemaPath);
      directOutputByPropNameMap[propName] = discriminatorConfig;
      continue;
    }
    const propOutput = applySchema(codeGenerator, propSchema, propSchemaPath);
    directOutputByPropNameMap[propName] = propOutput;
  }
  let additionalPropertiesDirectOutput: undefined | CodeGenerationOutput;
  if (schema.additionalProperties) {
    const propOutput = applySchema(codeGenerator, schema.additionalProperties, [
      ...path,
      objectSchemaAdditionalPropOutputPathPart,
    ]);
    additionalPropertiesDirectOutput = propOutput;
  }
  return {
    createCode: referencingContext => {
      const codeRows: string[] = [];
      for (const propName in schema.properties) {
        const directOutput = directOutputByPropNameMap[propName];
        if (discriminatorConfig && propName === discriminatorConfig.propName) {
          codeRows.push(
            `${propName}: ${directOutput.createCode(referencingContext)}`
          );
          continue;
        }
        const undefinableMark = !schema.required?.includes(propName) ? '?' : '';
        const propComment = directOutput.codeComment
          ? ` // ${directOutput.codeComment}`
          : '';
        codeRows.push(
          `${propName}${undefinableMark}: ${directOutput.createCode(
            referencingContext
          )};${propComment}`
        );
      }
      if (additionalPropertiesDirectOutput) {
        const propComment = additionalPropertiesDirectOutput.codeComment
          ? ` // ${additionalPropertiesDirectOutput.codeComment}`
          : '';
        codeRows.push(
          `[key: string]: ${additionalPropertiesDirectOutput.createCode(
            referencingContext
          )};${propComment}`
        );
      }

      return `{\n${codeRows.join('\n')}\n}`;
    },
    path,
    requiredOutputPaths,
  };
}

function getEnumValueFromItemSchema(
  itemSchema: Schema,
  discriminatorPropName: string,
  codeGenerator: CodeGenerator // todo: check if still required
): string {
  if (isComponentRef(itemSchema)) {
    return 'IMPLEMENT_ME'; // todo: implement
  }

  if (!isObjectSchema(itemSchema)) {
    throw new Error(
      `every item of oneOfSchema must have the discriminator property "${discriminatorPropName}", but no ObjectSchema was given: ${JSON.stringify(
        itemSchema
      )}`
    );
  }

  const discriminatorSchema = itemSchema.properties[discriminatorPropName];
  if (
    !isStringSchema(discriminatorSchema) ||
    discriminatorSchema.enum?.length !== 1
  ) {
    throw new Error(
      `only StringSchema with one specific enum value is supported for discriminators, but following schema was given for property "${discriminatorPropName}": ${JSON.stringify(
        itemSchema
      )}`
    );
  }

  return discriminatorSchema.enum[0];
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

export function applyOneOfSchema(
  codeGenerator: CodeGenerator,
  schema: OneOfSchema,
  path: OutputPath
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
          objectDiscriminatorConfig
        );
      } else if (isSchemaComponentRef(itemSchema)) {
        itemOutput = applyComponentRefSchema(
          codeGenerator,
          itemSchema,
          itemPath,
          objectDiscriminatorConfig
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
      itemOutput = applySchema(codeGenerator, itemSchema, itemPath);
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
