import {
  isSchemaComponentRef,
  SchemaComponentRef,
  zSchemaComponentRef,
} from './componentRef';
import {z} from 'zod';

// @ts-ignore - due to recursion
export const zConcreteSchema = z.lazy(() =>
  z.union([
    z.discriminatedUnion('type', [
      zBooleanSchema,
      zStringSchema,
      zNumberSchema,
      zIntegerSchema,
      zArraySchema,
      zObjectSchema,
    ]),
    zOneOfSchema,
    zAllOfSchema,
    zAnyOfSchema,
    zNotSchema,
  ])
);

export type ConcreteSchema = z.infer<typeof zConcreteSchema>;

export function isConcreteSchema(
  anyValue: unknown
): anyValue is ConcreteSchema {
  return zConcreteSchema.safeParse(anyValue).success;
}

// @ts-ignore - due to recursion
export const zSchema = z.union([zConcreteSchema, zSchemaComponentRef]);

export type Schema = z.infer<typeof zSchema>;

export function isSchema(anyValue: unknown): anyValue is Schema {
  return zSchema.safeParse(anyValue).success;
}

// @ts-ignore - due to recursion
export const zArraySchema = z.object({
  type: z.literal('array'),
  nullable: z.boolean().optional(),
  items: zSchema,
  uniqueItems: z.boolean().optional(),
  minItems: z.number().int().optional(),
  maxItems: z.number().int().optional(),
});

export type ArraySchema = z.infer<typeof zArraySchema>;

export function isArraySchema(anyValue: unknown): anyValue is ArraySchema {
  return zArraySchema.safeParse(anyValue).success;
}

export const zBooleanSchema = z.object({
  type: z.literal('boolean'),
  nullable: z.boolean().optional(),
});

export type BooleanSchema = z.infer<typeof zBooleanSchema>;

export function isBooleanSchema(anyValue: unknown): anyValue is BooleanSchema {
  return zBooleanSchema.safeParse(anyValue).success;
}

export const zObjectSchemaProps = z.record(zSchema);

export type ObjectSchemaProps = z.infer<typeof zObjectSchemaProps>;

export const zObjectSchema = z.object({
  type: z.literal('object'),
  required: z.array(z.string()).optional(),
  properties: zObjectSchemaProps.optional(),
  additionalProperties: zSchema.optional(),
  nullable: z.boolean().optional(),
});

export type ObjectSchema = z.infer<typeof zObjectSchema>;

export function isObjectSchema(anyValue: unknown): anyValue is ObjectSchema {
  return zObjectSchema.safeParse(anyValue).success;
}

export const zStringSchema = z.object({
  type: z.literal('string'),
  pattern: z.string().optional(),
  format: z.string().optional(),
  enum: z.array(z.string()).optional(),
  nullable: z.boolean().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
});

export type StringSchema = z.infer<typeof zStringSchema>;

export function isStringSchema(anyValue: unknown): anyValue is StringSchema {
  return zStringSchema.safeParse(anyValue).success;
}

export const zSchemaMetaData = z.object({
  description: z.string().optional(),
});

export type AllOfSchema = z.infer<typeof zAllOfSchema>;

export const zAllOfSchema = z.object({
  allOf: z.array(z.union([zSchema, zSchemaMetaData])), // at least one element should be a complete schema
});

export function isAllOfSchema(anyValue: unknown): anyValue is AllOfSchema {
  return zAllOfSchema.safeParse(anyValue).success;
}

export const zOneOfSchema = z.object({
  oneOf: z.array(zSchema),
  discriminator: z
    .object({
      propertyName: z.string(),
    })
    .optional(),
});

export type OneOfSchema = z.infer<typeof zOneOfSchema>;

export function isOneOfSchema(anyValue: unknown): anyValue is OneOfSchema {
  return zOneOfSchema.safeParse(anyValue).success;
}

export const zNotSchema = z.object({
  not: zSchema,
});

export type NotSchema = z.infer<typeof zNotSchema>;

export function isNotSchema(anyValue: unknown): anyValue is NotSchema {
  return zNotSchema.safeParse(anyValue).success;
}

export const zAnyOfSchema = z.object({
  anyOf: z.array(zSchema),
  discriminator: z
    .object({
      propertyName: z.string(),
    })
    .optional(),
});

export type AnyOfSchema = z.infer<typeof zAnyOfSchema>;

export function isAnyOfSchema(anyValue: unknown): anyValue is AnyOfSchema {
  return zAnyOfSchema.safeParse(anyValue).success;
}

export const zNumberSchema = z.object({
  type: z.literal('number'),
  nullable: z.boolean().optional(),
  minimum: z.number().optional(),
  exclusiveMinimum: z.number().optional(),
  maximum: z.number().optional(),
  exclusiveMaximum: z.number().optional(),
  multipleOf: z.number().optional(),
});

export type NumberSchema = z.infer<typeof zNumberSchema>;

export function isNumberSchema(anyValue: unknown): anyValue is NumberSchema {
  return zNumberSchema.safeParse(anyValue).success;
}

export const zIntegerSchema = z.object({
  type: z.literal('integer'),
  nullable: z.boolean().optional(),
  minimum: z.number().optional(),
  exclusiveMinimum: z.number().optional(),
  maximum: z.number().optional(),
  exclusiveMaximum: z.number().optional(),
  multipleOf: z.number().optional(),
});

export type IntegerSchema = z.infer<typeof zIntegerSchema>;

export function isIntegerSchema(anyValue: unknown): anyValue is IntegerSchema {
  return zIntegerSchema.safeParse(anyValue).success;
}
