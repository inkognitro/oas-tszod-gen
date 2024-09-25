import {zSchema} from './schema';
import {zResponseByStatusCodeMap} from './response';
import {zParameterComponentRef} from './componentRef';
import {z} from 'zod';

const zPermissionsBySecurityName = z.record(z.array(z.string()));

const zPermissionsBySecurityNameArray = z.array(zPermissionsBySecurityName);

export const zRequestBodyContent = z.object({
  schema: zSchema,
});

export type RequestBodyContent = z.infer<typeof zRequestBodyContent>;

export const zRequestBodyContentByTypeMap = z.record(zRequestBodyContent);

export type RequestBodyContentByTypeMap = z.infer<
  typeof zRequestBodyContentByTypeMap
>;

export const zRequestBody = z.object({
  content: zRequestBodyContentByTypeMap.optional(),
});

export type RequestBody = z.infer<typeof zRequestBody>;

export type ConcreteParameterLocation = 'query' | 'path' | 'header' | 'cookie';
export const concreteParameterLocations: ConcreteParameterLocation[] = [
  'query',
  'path',
  'header',
  'cookie',
];

const zConcreteParameter = z.object({
  name: z.string(),
  in: z.enum(['query', 'path', 'header', 'cookie']),
  required: z.boolean().optional(),
  schema: zSchema,
});

export type ConcreteParameter = z.infer<typeof zConcreteParameter>;

export function isConcreteParameter(
  anyValue: unknown
): anyValue is ConcreteParameter {
  return zConcreteParameter.safeParse(anyValue).success;
}

export const zParameter = z.union([zConcreteParameter, zParameterComponentRef]);

export type Parameter = z.infer<typeof zParameter>;

export function isParameter(anyValue: unknown): anyValue is Parameter {
  return zParameter.safeParse(anyValue).success;
}

export const zEndpoint = z.object({
  operationId: z.string().optional(),
  tags: z.array(z.string()),
  parameters: z.array(zParameter).optional(),
  requestBody: zRequestBody.optional(),
  summary: z.string().optional(),
  responses: zResponseByStatusCodeMap,
  security: zPermissionsBySecurityNameArray.nullable().optional(),
});

export type Endpoint = z.infer<typeof zEndpoint>;

export function isEndpoint(anyValue: unknown): anyValue is Endpoint {
  return zEndpoint.safeParse(anyValue).success;
}
