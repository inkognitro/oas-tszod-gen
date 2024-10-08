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

export const responseHeaderComponentRefPrefix = '#/components/headers/';

export const zResponseHeaderComponentRef = z.object({
  $ref: z.string().startsWith(responseHeaderComponentRefPrefix),
});

export type ResponseHeaderComponentRef = z.infer<
  typeof zResponseHeaderComponentRef
>;

export function isResponseHeaderComponentRef(
  anyValue: unknown
): anyValue is ResponseHeaderComponentRef {
  return zResponseHeaderComponentRef.safeParse(anyValue).success;
}

export const requestBodyComponentRefPrefix = '#/components/requestBodies/';

export const zRequestBodyComponentRef = z.object({
  $ref: z.string().startsWith(requestBodyComponentRefPrefix),
});

export type RequestBodyComponentRef = z.infer<typeof zRequestBodyComponentRef>;

export function isRequestBodyComponentRef(
  anyValue: unknown
): anyValue is RequestBodyComponentRef {
  return zRequestBodyComponentRef.safeParse(anyValue).success;
}
