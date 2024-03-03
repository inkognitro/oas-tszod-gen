import {v4} from 'uuid';
import {
  CodeGenerationSummary,
  IndirectOutput,
  IndirectOutputType,
  mergeIndirectOutputs,
} from './core';
import {
  ArraySchema,
  BooleanSchema,
  ComponentSchema,
  isArraySchema,
  isBooleanSchema,
  isComponentSchema,
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
  createTypeNameByComponentName(oas3ComponentName: string): string;
}

type SchemaCodeGenerationConfig = {
  contextOutputId?: string;
};

export function createSchemaCode(
  schema: Schema,
  codeGenerator: SchemaCodeGenerator,
  config: SchemaCodeGenerationConfig = {}
): CodeGenerationSummary {
  if (isComponentSchema(schema)) {
    return createComponentSchemaCode(schema, codeGenerator, config);
  }
  if (isBooleanSchema(schema)) {
    return createBooleanSchemaCode(schema, config);
  }
  if (isStringSchema(schema)) {
    return createStringSchemaCode(schema, config);
  }
  if (isNumberSchema(schema)) {
    return createNumberSchemaCode(schema, config);
  }
  if (isArraySchema(schema)) {
    return createArraySchemaCode(schema, codeGenerator, config);
  }
  if (isObjectSchema(schema)) {
    return createObjectSchemaCode(schema, codeGenerator, config);
  }
  if (isOneOfSchema(schema)) {
    return createOneOfSchemaCode(schema, codeGenerator, config);
  }
  throw new Error(`schema not supported: ${JSON.stringify(schema)}`);
}

export function createBooleanSchemaCode(
  schema: BooleanSchema,
  config: SchemaCodeGenerationConfig = {}
): CodeGenerationSummary {
  let code = 'boolean';
  if (schema.nullable) {
    code = `null | ${code}`;
  }
  return {
    directOutput: {id: v4(), code, contextOutputId: config.contextOutputId},
    indirectOutputs: [],
  };
}

function createStringSchemaCode(
  schema: StringSchema,
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
      id: v4(),
      code,
      contextOutputId: config.contextOutputId,
      codeComment,
    },
    indirectOutputs: [],
  };
}

export function createArraySchemaCode(
  schema: ArraySchema,
  codeManager: SchemaCodeGenerator,
  config: SchemaCodeGenerationConfig = {}
): CodeGenerationSummary {
  const outputId = v4();
  const itemSummary = createSchemaCode(schema.items, codeManager, {
    contextOutputId: outputId,
  });
  const codeComment = itemSummary.directOutput.codeComment
    ? `item: ${itemSummary.directOutput.codeComment}`
    : undefined;
  return {
    directOutput: {
      id: outputId,
      code: `${itemSummary.directOutput}[]`,
      codeComment,
      contextOutputId: config.contextOutputId,
    },
    indirectOutputs: itemSummary.indirectOutputs,
  };
}

export function createNumberSchemaCode(
  schema: NumberSchema,
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
      id: v4(),
      code,
      codeComment,
      contextOutputId: config.contextOutputId,
    },
    indirectOutputs: [],
  };
}

function createComponentNameByOasSchemaRef(oas3SchemaRef: string): string {
  return oas3SchemaRef.replace('#/components/schemas/', '');
}

function createTypeNameByOasSchemaRef(
  oas3SchemaRef: string,
  codeManager: SchemaCodeGenerator
): string {
  const componentName = createComponentNameByOasSchemaRef(oas3SchemaRef);
  return codeManager.createTypeNameByComponentName(componentName);
}

export function createComponentSchemaCode(
  schema: ComponentSchema,
  codeManager: SchemaCodeGenerator,
  config: SchemaCodeGenerationConfig = {},
  objectDiscriminatorConfig?: ObjectDiscriminatorConfig
): CodeGenerationSummary {
  const typeName = createTypeNameByOasSchemaRef(schema.$ref, codeManager);
  return {
    directOutput: {id: v4(), code: typeName},
    indirectOutputs: [
      {
        id: v4(),
        type: IndirectOutputType.COMPONENT_REF,
        typeName,
        componentName: createComponentNameByOasSchemaRef(schema.$ref),
        objectDiscriminatorConfig,
        contextOutputId: config.contextOutputId,
      },
    ],
  };
}

type ObjectDiscriminatorConfig = {
  propName: string;
  propValueCode: string;
};

export function createObjectSchemaCode(
  schema: ObjectSchema,
  codeManager: SchemaCodeGenerator,
  config: SchemaCodeGenerationConfig = {},
  discriminatorConfig?: ObjectDiscriminatorConfig
): CodeGenerationSummary {
  const outputId = v4();
  const codeRows: string[] = [];
  let indirectOutputs: IndirectOutput[] = [];
  for (const propName in schema.properties) {
    const propSchema = schema.properties[propName];
    if (discriminatorConfig && propName === discriminatorConfig.propName) {
      const propSummary = createSchemaCode(propSchema, codeManager, {
        contextOutputId: outputId,
      });
      indirectOutputs = mergeIndirectOutputs(
        indirectOutputs,
        propSummary.indirectOutputs
      );
      codeRows.push(`${propName}: ${discriminatorConfig.propValueCode}`);
      continue;
    }
    const propSummary = createSchemaCode(propSchema, codeManager, {
      contextOutputId: outputId,
    });
    indirectOutputs = mergeIndirectOutputs(
      indirectOutputs,
      propSummary.indirectOutputs
    );
    const undefinableMark = !schema.required?.includes(propName) ? '?' : '';
    const propComment = propSummary.directOutput.codeComment
      ? ` // ${propSummary.directOutput.codeComment}`
      : '';
    codeRows.push(
      `${propName}${undefinableMark}: ${propSummary.directOutput.code};${propComment}`
    );
  }
  if (schema.additionalProperties) {
    const propSummary = createSchemaCode(
      schema.additionalProperties,
      codeManager,
      {contextOutputId: outputId}
    );
    indirectOutputs = mergeIndirectOutputs(
      indirectOutputs,
      propSummary.indirectOutputs
    );
    const propComment = propSummary.directOutput.codeComment
      ? ` // ${propSummary.directOutput.codeComment}`
      : '';
    codeRows.push(
      `[key: string]: ${propSummary.directOutput.code};${propComment}`
    );
  }
  return {
    directOutput: {
      id: outputId,
      code: `{\n${codeRows.join('\n')}\n}`,
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
      `every item of oneOfSchema must have the discriminator property "${discriminatorPropName}": ${JSON.stringify(
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

function createEnumDiscriminatorOutputType(
  oneOfSchema: OneOfSchema,
  discriminatorPropName: string,
  config: SchemaCodeGenerationConfig,
  typeName: string
): IndirectOutput {
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
    type: IndirectOutputType.TYPE_DEFINITION,
    typeName,
    codeType: 'enum',
    code: `{\n${enumsCodeLines.join(',\n')}\n}`,
    contextOutputId: config.contextOutputId,
  };
}

export function createOneOfSchemaCode(
  schema: OneOfSchema,
  codeGenerator: SchemaCodeGenerator,
  config: SchemaCodeGenerationConfig
): CodeGenerationSummary {
  const outputId = v4();
  const subSchemaGenerationConfig: SchemaCodeGenerationConfig = {
    contextOutputId: outputId,
  };

  const codeParts: string[] = [];
  let indirectOutputs: IndirectOutput[] = [];

  let enumTypeName = '';
  const discriminatorPropName = schema.discriminator?.propertyName;
  if (discriminatorPropName) {
    enumTypeName = isComponentSchema(schema)
      ? capitalizeFirstLetter(
          createTypeNameByOasSchemaRef(schema.$ref, codeGenerator)
        )
      : capitalizeFirstLetter(discriminatorPropName);
    indirectOutputs.push(
      createEnumDiscriminatorOutputType(
        schema,
        discriminatorPropName,
        subSchemaGenerationConfig,
        enumTypeName
      )
    );
  }

  schema.oneOf.forEach(itemSchema => {
    let itemSummary: undefined | CodeGenerationSummary;
    if (discriminatorPropName) {
      const objectDiscriminatorConfig: ObjectDiscriminatorConfig = {
        propName: discriminatorPropName,
        propValueCode: `${enumTypeName}.${getEnumValueFromItemSchema(
          itemSchema,
          discriminatorPropName
        )}`,
      };
      if (isObjectSchema(itemSchema)) {
        itemSummary = createObjectSchemaCode(
          itemSchema,
          codeGenerator,
          subSchemaGenerationConfig,
          objectDiscriminatorConfig
        );
      } else if (isComponentSchema(itemSchema)) {
        itemSummary = createComponentSchemaCode(
          itemSchema,
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
    }
    if (!itemSummary) {
      itemSummary = createSchemaCode(
        itemSchema,
        codeGenerator,
        subSchemaGenerationConfig
      );
    }
    indirectOutputs = mergeIndirectOutputs(
      indirectOutputs,
      itemSummary.indirectOutputs
    );
    const itemComment = itemSummary.directOutput.codeComment
      ? ` // ${itemSummary.directOutput.codeComment}`
      : '';
    codeParts.push(`| ${itemSummary.directOutput.code}${itemComment}`);
  });
  return {
    directOutput: {
      id: outputId,
      code: `${codeParts.join('\n')}`,
      contextOutputId: config.contextOutputId,
    },
    indirectOutputs,
  };
}
