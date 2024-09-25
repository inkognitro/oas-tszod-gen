import {z} from 'zod';

export const schemaComponentRefPrefix = '#/components/schemas/';

export const zSchemaComponentRef = z.object({
  $ref: z.string().startsWith(schemaComponentRefPrefix),
});

export type SchemaComponentRef = z.infer<typeof zSchemaComponentRef>;

export function isSchemaComponentRef(
  anyValue: unknown
): anyValue is SchemaComponentRef {
  return zSchemaComponentRef.safeParse(anyValue).success;
}

export const responseComponentRefPrefix = '#/components/responses/';

export const zResponseComponentRef = z.object({
  $ref: z.string().startsWith(responseComponentRefPrefix),
});

export type ResponseComponentRef = z.infer<typeof zResponseComponentRef>;

export function isResponseComponentRef(
  anyValue: unknown
): anyValue is ResponseComponentRef {
  return zResponseComponentRef.safeParse(anyValue).success;
}

export const parameterComponentRefPrefix = '#/components/parameters/';

export const zParameterComponentRef = z.object({
  $ref: z.string().startsWith(parameterComponentRefPrefix),
});

export type ParameterComponentRef = z.infer<typeof zParameterComponentRef>;

export function isParameterComponentRef(
  anyValue: unknown
): anyValue is ParameterComponentRef {
  return zParameterComponentRef.safeParse(anyValue).success;
}

export const securitySchemeComponentRefPrefix = '#/components/securitySchemes/';

export const zSecuritySchemeComponentRef = z.object({
  $ref: z.string().startsWith(securitySchemeComponentRefPrefix),
});

export type SecurityComponentRef = z.infer<typeof zSecuritySchemeComponentRef>;

export function isSecuritySchemesComponentRef(
  anyValue: unknown
): anyValue is SecurityComponentRef {
  return zSecuritySchemeComponentRef.safeParse(anyValue).success;
}
