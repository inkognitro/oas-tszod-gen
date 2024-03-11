import {v4} from 'uuid';
import {
  CodeGenerationSummary,
  CreateCodeFunc,
  DirectOutput,
  IndirectOutput,
  mergeIndirectOutputs,
  ObjectDiscriminatorConfig,
  OutputType,
  EnumDefinitionOutput,
  OutputPath,
  arrayItemPathPart,
} from './core';
import {
  ArraySchema,
  BooleanSchema,
  ComponentRefSchema,
  isArraySchema,
  isBooleanSchema,
  isComponentRefSchema,
  isNumberSchema,
  isObjectSchema,
  isOneOfSchema,
  isStringSchema,
  NumberSchema,
  ObjectSchema,
  OneOfSchema,
  Schema,
  StringSchema,
} from '@oas3/specification';

export interface SchemaCodeGenerator {
  createComponentTypeName(ref: string, referencingPath: OutputPath): string;
  createEnumName(path: OutputPath, referencingPath: OutputPath): string;
}

export function createSchemaSummary(
  schema: Schema,
  path: OutputPath,
  codeGenerator: SchemaCodeGenerator
): CodeGenerationSummary {
  if (isComponentRefSchema(schema)) {
    return createComponentRefSchemaSummary(schema, path, codeGenerator);
  }
  if (isBooleanSchema(schema)) {
    return createBooleanSchemaSummary(schema, path);
  }
  if (isStringSchema(schema)) {
    return createStringSchemaSummary(schema, path);
  }
  if (isNumberSchema(schema)) {
    return createNumberSchemaSummary(schema, path);
  }
  if (isArraySchema(schema)) {
    return createArraySchemaSummary(schema, path, codeGenerator);
  }
  if (isObjectSchema(schema)) {
    return createObjectSchemaSummary(schema, path, codeGenerator);
  }
  if (isOneOfSchema(schema)) {
    return createOneOfSchemaSummary(schema, path, codeGenerator);
  }
  throw new Error(`schema not supported: ${JSON.stringify(schema)}`);
}

export function createBooleanSchemaSummary(
  schema: BooleanSchema,
  path: OutputPath
): CodeGenerationSummary {
  let code = 'boolean';
  if (schema.nullable) {
    code = `null | ${code}`;
  }
  return {
    directOutput: {
      type: OutputType.DIRECT,
      id: v4(),
      createCode: () => {
        return code;
      },
      path,
      requiredOutputPaths: [],
    },
    indirectOutputs: [],
  };
}

function createStringSchemaSummary(
  schema: StringSchema,
  path: OutputPath
): CodeGenerationSummary {
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
    directOutput: {
      type: OutputType.DIRECT,
      id: v4(),
      createCode: () => {
        return code;
      },
      path,
      requiredOutputPaths: [],
      codeComment,
    },
    indirectOutputs: [],
  };
}

export function createArraySchemaSummary(
  schema: ArraySchema,
  path: OutputPath,
  codeGenerator: SchemaCodeGenerator
): CodeGenerationSummary {
  const outputId = v4();
  const itemSummary = createSchemaSummary(
    schema.items,
    [...path, arrayItemPathPart],
    codeGenerator
  );
  const codeComment = itemSummary.directOutput.codeComment
    ? `item: ${itemSummary.directOutput.codeComment}`
    : undefined;
  return {
    directOutput: {
      type: OutputType.DIRECT,
      id: outputId,
      createCode: referencingContext => {
        return `(${itemSummary.directOutput.createCode(referencingContext)})[]`;
      },
      codeComment,
      path,
      requiredOutputPaths: [itemSummary.directOutput.path],
    },
    indirectOutputs: itemSummary.indirectOutputs,
  };
}

export function createNumberSchemaSummary(
  schema: NumberSchema,
  path: OutputPath
): CodeGenerationSummary {
  let codeComment: undefined | string = undefined;
  let code = 'number';
  if (schema.nullable) {
    code = `null | ${code}`;
  }
  if (schema.format) {
    codeComment = schema.format;
  }
  return {
    directOutput: {
      type: OutputType.DIRECT,
      id: v4(),
      createCode: () => {
        return code;
      },
      codeComment,
      path,
      requiredOutputPaths: [],
    },
    indirectOutputs: [],
  };
}

export function createComponentRefSchemaSummary(
  schema: ComponentRefSchema,
  path: OutputPath,
  codeGenerator: SchemaCodeGenerator,
  objectDiscriminatorConfig?: ObjectDiscriminatorConfig
): CodeGenerationSummary {
  return {
    directOutput: {
      type: OutputType.DIRECT,
      id: v4(),
      createCode: referencingPath =>
        codeGenerator.createComponentTypeName(schema.$ref, referencingPath),
      path,
      requiredOutputPaths: [],
    },
    indirectOutputs: [
      {
        id: v4(),
        type: OutputType.COMPONENT_REF,
        createTypeName: referencingPath => {
          return codeGenerator.createComponentTypeName(
            schema.$ref,
            referencingPath
          );
        },
        componentRef: schema.$ref,
        objectDiscriminatorConfig,
        path,
        requiredOutputPaths: [],
      },
    ],
  };
}

export function createObjectSchemaSummary(
  schema: ObjectSchema,
  path: OutputPath,
  codeGenerator: SchemaCodeGenerator,
  discriminatorConfig?: ObjectDiscriminatorConfig
): CodeGenerationSummary {
  const outputId = v4();
  const directOutputByPropNameMap: {
    [propName: string]: {
      createCode: CreateCodeFunc;
      codeComment?: string;
    };
  } = {};
  let indirectOutputs: IndirectOutput[] = [];
  for (const propName in schema.properties) {
    const propSchema = schema.properties[propName];
    if (discriminatorConfig && propName === discriminatorConfig.propName) {
      const propSummary = createSchemaSummary(
        propSchema,
        context,
        codeGenerator,
        {
          contextOutputId: outputId,
        }
      );
      indirectOutputs = mergeIndirectOutputs(
        indirectOutputs,
        propSummary.indirectOutputs
      );
      directOutputByPropNameMap[propName] = discriminatorConfig;
      continue;
    }
    const propSummary = createSchemaSummary(
      propSchema,
      context,
      codeGenerator,
      {
        contextOutputId: outputId,
      }
    );
    indirectOutputs = mergeIndirectOutputs(
      indirectOutputs,
      propSummary.indirectOutputs
    );
    directOutputByPropNameMap[propName] = propSummary.directOutput;
  }
  let additionalPropertiesDirectOutput: undefined | DirectOutput;
  if (schema.additionalProperties) {
    const propSummary = createSchemaSummary(
      schema.additionalProperties,
      context,
      codeGenerator,
      {contextOutputId: outputId}
    );
    additionalPropertiesDirectOutput = propSummary.directOutput;
    indirectOutputs = mergeIndirectOutputs(
      indirectOutputs,
      propSummary.indirectOutputs
    );
  }
  return {
    directOutput: {
      type: OutputType.DIRECT,
      id: outputId,
      createCode: referencingContext => {
        const codeRows: string[] = [];
        for (const propName in schema.properties) {
          const directOutput = directOutputByPropNameMap[propName];
          if (
            discriminatorConfig &&
            propName === discriminatorConfig.propName
          ) {
            codeRows.push(
              `${propName}: ${directOutput.createCode(referencingContext)}`
            );
            continue;
          }
          const undefinableMark = !schema.required?.includes(propName)
            ? '?'
            : '';
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
      context,
      contextOutputId: config.contextOutputId,
    },
    indirectOutputs,
  };
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getEnumValueFromItemSchema(
  itemSchema: Schema,
  discriminatorPropName: string
): string {
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
  context: string,
  codeGenerator: SchemaCodeGenerator,
  config: SchemaCodeGenerationConfig
): null | EnumDefinitionOutput {
  const discriminatorPropName = oneOfSchema.discriminator?.propertyName;
  if (!discriminatorPropName) {
    return null;
  }
  const enumParts: string[] = [];
  oneOfSchema.oneOf.forEach(itemSchema => {
    enumParts.push(
      getEnumValueFromItemSchema(itemSchema, discriminatorPropName)
    );
  });
  const enumsCodeLines: string[] = [];
  enumParts.forEach(e => {
    const entryName = capitalizeFirstLetter(e);
    enumsCodeLines.push(`${entryName} = "${entryName}"`);
  });
  return {
    id: v4(),
    type: OutputType.ENUM_DEFINITION,
    createTypeName: (prefixes: string[], referencingContext?: string) => {
      return codeGenerator.createEnumName(
        [...prefixes, discriminatorPropName],
        context,
        referencingContext
      );
    },
    createCode: () => `{\n${enumsCodeLines.join(',\n')}\n}`,
    context,
    contextOutputId: config.contextOutputId,
  };
}

export function createOneOfSchemaSummary(
  schema: OneOfSchema,
  context: string,
  codeGenerator: SchemaCodeGenerator,
  config: SchemaCodeGenerationConfig
): CodeGenerationSummary {
  const outputId = v4();
  const subSchemaGenerationConfig: SchemaCodeGenerationConfig = {
    contextOutputId: outputId,
  };
  let indirectOutputs: IndirectOutput[] = [];
  const discriminatorEnumDefinitionOutput =
    createNullableDiscriminatorEnumDefinitionOutput(
      schema,
      context,
      codeGenerator,
      subSchemaGenerationConfig
    );
  if (discriminatorEnumDefinitionOutput) {
    indirectOutputs.push(discriminatorEnumDefinitionOutput);
  }

  const itemDirectOutputs: DirectOutput[] = [];
  schema.oneOf.forEach(itemSchema => {
    let itemSummary: undefined | CodeGenerationSummary;
    if (discriminatorEnumDefinitionOutput) {
      const discriminatorPropName = schema.discriminator?.propertyName;
      if (!discriminatorPropName) {
        throw new Error('this case should never happen');
      }
      const objectDiscriminatorConfig: ObjectDiscriminatorConfig = {
        requiredOutputId: discriminatorEnumDefinitionOutput.id,
        propName: discriminatorPropName,
        createCode: referencingContext => {
          const enumTypeName =
            discriminatorEnumDefinitionOutput.createTypeName(
              referencingContext
            );
          return `${enumTypeName}.${getEnumValueFromItemSchema(
            itemSchema,
            discriminatorPropName
          )}`;
        },
      };
      if (isObjectSchema(itemSchema)) {
        itemSummary = createObjectSchemaSummary(
          itemSchema,
          context,
          codeGenerator,
          subSchemaGenerationConfig,
          objectDiscriminatorConfig
        );
      } else if (isComponentRefSchema(itemSchema)) {
        itemSummary = createComponentRefSchemaSummary(
          itemSchema,
          context,
          codeGenerator,
          subSchemaGenerationConfig,
          objectDiscriminatorConfig
        );
      } else {
        throw new Error(
          `oneOf with defined discriminator.propertyName "${discriminatorPropName}" must only contain objectSchema, but following schema was given: ${JSON.stringify(
            itemSchema
          )}`
        );
      }
      itemDirectOutputs.push(itemSummary.directOutput);
    }
    if (!itemSummary) {
      itemSummary = createSchemaSummary(
        itemSchema,
        context,
        codeGenerator,
        subSchemaGenerationConfig
      );
    }
    indirectOutputs = mergeIndirectOutputs(
      indirectOutputs,
      itemSummary.indirectOutputs
    );
  });
  return {
    directOutput: {
      type: OutputType.DIRECT,
      id: outputId,
      createCode: referencingContext => {
        const codeParts: string[] = [];
        itemDirectOutputs.forEach(directOutput => {
          const itemComment = directOutput.codeComment
            ? ` // ${directOutput.codeComment}`
            : '';
          codeParts.push(
            `| ${directOutput.createCode(referencingContext)}${itemComment}`
          );
        });
        return `${codeParts.join('\n')}`;
      },
      context,
      contextOutputId: config.contextOutputId,
    },
    indirectOutputs,
  };
}
