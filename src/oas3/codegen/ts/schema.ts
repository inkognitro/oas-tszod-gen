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
} from '../../specification';

interface CodeGenerator {
  createTypeNameByComponentName(oas3ComponentName: string): string;
}

export function createSchemaCode(
  schema: Schema,
  codeGenerator: CodeGenerator
): CodeGenerationSummary {
  if (isComponentSchema(schema)) {
    return createComponentSchemaCode(schema, codeGenerator);
  }
  if (isBooleanSchema(schema)) {
    return createBooleanSchemaCode(schema);
  }
  if (isStringSchema(schema)) {
    return createStringSchemaCode(schema);
  }
  if (isNumberSchema(schema)) {
    return createNumberSchemaCode(schema);
  }
  if (isArraySchema(schema)) {
    return createArraySchemaCode(schema, codeGenerator);
  }
  if (isObjectSchema(schema)) {
    return createObjectSchemaCode(schema, codeGenerator);
  }
  if (isOneOfSchema(schema)) {
    return createOneOfSchemaCode(schema, codeGenerator);
  }
  throw new Error(`schema not supported: ${JSON.stringify(schema)}`);
}

export function createBooleanSchemaCode(
  schema: BooleanSchema
): CodeGenerationSummary {
  let code = 'boolean';
  if (schema.nullable) {
    code = `null | ${code}`;
  }
  return {
    directOutput: {code},
    indirectOutputs: [],
  };
}

function createStringSchemaCode(schema: StringSchema): CodeGenerationSummary {
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
    directOutput: {code, codeComment},
    indirectOutputs: [],
  };
}

export function createArraySchemaCode(
  schema: ArraySchema,
  codeManager: CodeGenerator
): CodeGenerationSummary {
  const itemSummary = createSchemaCode(schema.items, codeManager);
  const codeComment = itemSummary.directOutput.codeComment
    ? `item: ${itemSummary.directOutput.codeComment}`
    : undefined;
  return {
    directOutput: {code: `${itemSummary.directOutput}[]`, codeComment},
    indirectOutputs: itemSummary.indirectOutputs,
  };
}

export function createNumberSchemaCode(
  schema: NumberSchema
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
    directOutput: {code, codeComment},
    indirectOutputs: [],
  };
}

export function createComponentSchemaCode(
  schema: ComponentSchema,
  codeManager: CodeGenerator,
  objectDiscriminatorConfig?: ObjectDiscriminatorConfig
): CodeGenerationSummary {
  const componentName = schema.$ref.replace('#/components/schemas/', '');
  const typeName = codeManager.createTypeNameByComponentName(componentName);
  return {
    directOutput: {code: typeName},
    indirectOutputs: [
      {
        type: IndirectOutputType.COMPONENT_REF,
        typeName: typeName,
        componentName,
        objectDiscriminatorConfig,
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
  codeManager: CodeGenerator,
  discriminatorConfig?: ObjectDiscriminatorConfig
): CodeGenerationSummary {
  const codeRows: string[] = [];
  let indirectOutputs: IndirectOutput[] = [];
  for (const propName in schema.properties) {
    const propSchema = schema.properties[propName];
    if (discriminatorConfig && propName === discriminatorConfig.propName) {
      const propSummary = createSchemaCode(propSchema, codeManager);
      indirectOutputs = mergeIndirectOutputs(
        indirectOutputs,
        propSummary.indirectOutputs
      );
      codeRows.push(`${propName}: ${discriminatorConfig.propValueCode}`);
      continue;
    }
    const propSummary = createSchemaCode(propSchema, codeManager);
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
      codeManager
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
    directOutput: {code: `{\n${codeRows.join('\n')}\n}`},
    indirectOutputs,
  };
}

/*
type X =
  | 'sdfkjsdklfsddfdfj'
  | 'sdfkljsdfklsdjdsflkdsf'
  | 'sdflkjsdfjklsdfklsdfljkldf'
  | '2349324lsdfsdfödfklö';
*/

/*
enum FooType {
  daily = 'daily',
  weekdays = 'weekdays',
  exact = 'exact',
}

type DailyFoo = {
  type: FooType.daily;
  day: string;
};

type WeekdaysFoo = {
  type: FooType.weekdays;
  weekdays: string;
};

type ExactFoo = {
  type: FooType.exact;
  weekdays: string;
};

type Foo = DailyFoo | WeekdaysFoo | ExactFoo;
*/

function capitalizeFirstLetterOnly(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
  discriminatorPropName: string
): IndirectOutput {
  const enumParts: string[] = [];
  oneOfSchema.oneOf.forEach(itemSchema => {
    enumParts.push(
      getEnumValueFromItemSchema(itemSchema, discriminatorPropName)
    );
  });
  const enumsCodeLines: string[] = [];
  enumParts.forEach(e => {
    const entryName = capitalizeFirstLetterOnly(e);
    enumsCodeLines.push(`${entryName} = "${entryName}"`);
  });
  return {
    type: IndirectOutputType.TYPE_DEFINITION,
    typeName: '', // todo: implement
    codeType: 'enum',
    code: `enum ${capitalizeFirstLetterOnly(
      discriminatorPropName
    )} {\n${enumsCodeLines.join('\n')}\n}`,
  };
}

export function createOneOfSchemaCode(
  schema: OneOfSchema,
  codeGenerator: CodeGenerator
): CodeGenerationSummary {
  const codeParts: string[] = [];
  let indirectOutputs: IndirectOutput[] = [];

  const discriminatorPropName = schema.discriminator?.propertyName;
  if (discriminatorPropName) {
    indirectOutputs.push(
      createEnumDiscriminatorOutputType(schema, discriminatorPropName)
    );
  }

  schema.oneOf.forEach(itemSchema => {
    let itemSummary: undefined | CodeGenerationSummary;
    if (discriminatorPropName) {
      const objectDiscriminatorConfig: ObjectDiscriminatorConfig = {
        propName: discriminatorPropName,
        propValueCode: '', // todo: implement: "getEnumValueFromItemSchema(itemSchema, discriminatorPropName)"
      };
      if (isObjectSchema(itemSchema)) {
        itemSummary = createObjectSchemaCode(
          itemSchema,
          codeGenerator,
          objectDiscriminatorConfig
        ); // todo: overwrite discriminatorProp with enum somehow instead of string
      } else if (isComponentSchema(itemSchema)) {
        itemSummary = createComponentSchemaCode(
          itemSchema,
          codeGenerator,
          objectDiscriminatorConfig
        ); // todo: overwrite discriminatorPropName with enum somehow instead of string
      } else {
        throw new Error(
          `oneOf with defined discriminator.propertyName "${discriminatorPropName}" must only contain objectSchema, but following schema was given: ${JSON.stringify(
            itemSchema
          )}`
        );
      }
    }
    if (!itemSummary) {
      itemSummary = createSchemaCode(itemSchema, codeGenerator);
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
    directOutput: {code: `${codeParts.join('\n')}`},
    indirectOutputs,
  };
}
