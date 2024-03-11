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
  createComponentTypeName(
    ref: string,
    context: string,
    referencingContext?: string
  ): string;
}

type SchemaCodeGenerationConfig = {
  contextOutputId?: string;
};

export function createSchemaCode(
  schema: Schema,
  context: string,
  codeGenerator: SchemaCodeGenerator,
  config: SchemaCodeGenerationConfig = {}
): CodeGenerationSummary {
  if (isComponentRefSchema(schema)) {
    return createComponentRefSchemaCode(schema, context, codeGenerator, config);
  }
  if (isBooleanSchema(schema)) {
    return createBooleanSchemaCode(schema, context, config);
  }
  if (isStringSchema(schema)) {
    return createStringSchemaCode(schema, context, config);
  }
  if (isNumberSchema(schema)) {
    return createNumberSchemaCode(schema, context, config);
  }
  if (isArraySchema(schema)) {
    return createArraySchemaCode(schema, context, codeGenerator, config);
  }
  if (isObjectSchema(schema)) {
    return createObjectSchemaCode(schema, context, codeGenerator, config);
  }
  if (isOneOfSchema(schema)) {
    return createOneOfSchemaCode(schema, context, codeGenerator, config);
  }
  throw new Error(`schema not supported: ${JSON.stringify(schema)}`);
}

export function createBooleanSchemaCode(
  schema: BooleanSchema,
  context: string,
  config: SchemaCodeGenerationConfig = {}
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
      context,
      contextOutputId: config.contextOutputId,
    },
    indirectOutputs: [],
  };
}

function createStringSchemaCode(
  schema: StringSchema,
  context: string,
  config: SchemaCodeGenerationConfig = {}
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
      contextOutputId: config.contextOutputId,
      context,
      codeComment,
    },
    indirectOutputs: [],
  };
}

export function createArraySchemaCode(
  schema: ArraySchema,
  context: string,
  codeManager: SchemaCodeGenerator,
  config: SchemaCodeGenerationConfig = {}
): CodeGenerationSummary {
  const outputId = v4();
  const itemSummary = createSchemaCode(schema.items, context, codeManager, {
    contextOutputId: outputId,
  });
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
      context,
      contextOutputId: config.contextOutputId,
    },
    indirectOutputs: itemSummary.indirectOutputs,
  };
}

export function createNumberSchemaCode(
  schema: NumberSchema,
  context: string,
  config: SchemaCodeGenerationConfig = {}
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
      context,
      contextOutputId: config.contextOutputId,
    },
    indirectOutputs: [],
  };
}

export function createComponentRefSchemaCode(
  schema: ComponentRefSchema,
  context: string,
  codeManager: SchemaCodeGenerator,
  config: SchemaCodeGenerationConfig = {},
  objectDiscriminatorConfig?: ObjectDiscriminatorConfig
): CodeGenerationSummary {
  return {
    directOutput: {
      type: OutputType.DIRECT,
      id: v4(),
      createCode: referencingContext =>
        codeManager.createComponentTypeName(
          schema.$ref,
          context,
          referencingContext
        ),
      context,
    },
    indirectOutputs: [
      {
        id: v4(),
        type: OutputType.COMPONENT_REF,
        componentRef: schema.$ref,
        objectDiscriminatorConfig,
        context,
        contextOutputId: config.contextOutputId,
      },
    ],
  };
}

export function createObjectSchemaCode(
  schema: ObjectSchema,
  context: string,
  codeManager: SchemaCodeGenerator,
  config: SchemaCodeGenerationConfig = {},
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
      const propSummary = createSchemaCode(propSchema, context, codeManager, {
        contextOutputId: outputId,
      });
      indirectOutputs = mergeIndirectOutputs(
        indirectOutputs,
        propSummary.indirectOutputs
      );
      directOutputByPropNameMap[propName] = discriminatorConfig;
      continue;
    }
    const propSummary = createSchemaCode(propSchema, context, codeManager, {
      contextOutputId: outputId,
    });
    indirectOutputs = mergeIndirectOutputs(
      indirectOutputs,
      propSummary.indirectOutputs
    );
    directOutputByPropNameMap[propName] = propSummary.directOutput;
  }
  let additionalPropertiesDirectOutput: undefined | DirectOutput;
  if (schema.additionalProperties) {
    const propSummary = createSchemaCode(
      schema.additionalProperties,
      context,
      codeManager,
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
  const localName = `${capitalizeFirstLetter(discriminatorPropName)}`;
  return {
    id: v4(),
    type: OutputType.ENUM_DEFINITION,
    createTypeName: referencingContext => {
      codeGenerator.createEnumTypeName(referencingContext);
    },
    createCode: () => `{\n${enumsCodeLines.join(',\n')}\n}`,
    context,
    contextOutputId: config.contextOutputId,
  };
}

export function createOneOfSchemaCode(
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
        itemSummary = createObjectSchemaCode(
          itemSchema,
          context,
          codeGenerator,
          subSchemaGenerationConfig,
          objectDiscriminatorConfig
        );
      } else if (isComponentRefSchema(itemSchema)) {
        itemSummary = createComponentRefSchemaCode(
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
      itemSummary = createSchemaCode(
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
