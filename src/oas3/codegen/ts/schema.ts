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
  codeManager: CodeGenerator
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
      },
    ],
  };
}

export function createObjectSchemaCode(
  schema: ObjectSchema,
  codeManager: CodeGenerator
): CodeGenerationSummary {
  const codeRows: string[] = [];
  let indirectOutputs: IndirectOutput[] = [];
  for (const propName in schema.properties) {
    const propSchema = schema.properties[propName];
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

export function createOneOfSchemaCode(
  schema: OneOfSchema,
  codeManager: CodeGenerator
): CodeGenerationSummary {
  throw new Error('implement me!'); // todo: implement
}
