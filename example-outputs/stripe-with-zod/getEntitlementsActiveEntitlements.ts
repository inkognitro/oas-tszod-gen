import {
  z_Entitlements_Active_entitlement,
  z_Error,
  Entitlements_Active_entitlement,
  Error,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe-with-zod/core';

export const getEntitlementsActiveEntitlementsEndpointSchema = {
  path: '/v1/entitlements/active_entitlements',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    customer: z.string(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            data: z.array(z_Entitlements_Active_entitlement),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
          }),
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetEntitlementsActiveEntitlementsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    customer: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetEntitlementsActiveEntitlementsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Entitlements_Active_entitlement[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetEntitlementsActiveEntitlementsRequestResult = RequestResult<
  GetEntitlementsActiveEntitlementsRequest,
  GetEntitlementsActiveEntitlementsResponse
>;

export function getEntitlementsActiveEntitlements(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetEntitlementsActiveEntitlementsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetEntitlementsActiveEntitlementsRequestResult> {
  return requestHandler.execute(
    createRequest(getEntitlementsActiveEntitlementsEndpointSchema, payload),
    config
  );
}
