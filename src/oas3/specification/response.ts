import {zSchema} from './schema';
import {zResponseComponentRef} from './componentRef';
import {z} from 'zod';

export const zResponseBodyContent = z.object({
  schema: zSchema,
});

export type ResponseBodyContent = z.infer<typeof zResponseBodyContent>;

export const zResponseBodyContentByContentTypeMap =
  z.record(zResponseBodyContent);

export type ResponseBodyContentByContentTypeMap = z.infer<
  typeof zResponseBodyContentByContentTypeMap
>;

export const zResponseHeader = z.object({
  schema: zSchema,
});

export const zResponseHeaderByNameMap = z.record(zResponseHeader);

export type ResponseHeaderByNameMap = z.infer<typeof zResponseHeaderByNameMap>;

export const zConcreteResponse = z.object({
  description: z.string().optional(),
  content: zResponseBodyContentByContentTypeMap.optional(),
  headers: zResponseHeaderByNameMap.optional(),
});

export type ConcreteResponse = z.infer<typeof zConcreteResponse>;

export function isConcreteResponse(
  anyValue: unknown
): anyValue is ConcreteResponse {
  return zConcreteResponse.safeParse(anyValue).success;
}

export const zResponse = z.union([zConcreteResponse, zResponseComponentRef]);

export type Response = z.infer<typeof zResponse>;

export const zResponseByStatusCodeMap = z.record(zResponse);

export type ResponseByStatusCodeMap = z.infer<typeof zResponseByStatusCodeMap>;
