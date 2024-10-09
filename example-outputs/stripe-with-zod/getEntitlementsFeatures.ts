import {
  z_Entitlements_Feature,
  z_Error,
  Entitlements_Feature,
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

export const getEntitlementsFeaturesEndpointSchema = {
  path: '/v1/entitlements/features',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    archived: z.boolean().optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    lookup_key: z.string().optional(),
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
            data: z.array(z_Entitlements_Feature),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/entitlements\/features/),
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

export type GetEntitlementsFeaturesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    archived?: boolean;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    lookup_key?: string;
    starting_after?: string;
  }
>;

export type GetEntitlementsFeaturesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Entitlements_Feature[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetEntitlementsFeaturesRequestResult = RequestResult<
  GetEntitlementsFeaturesRequest,
  GetEntitlementsFeaturesResponse
>;

export function getEntitlementsFeatures(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetEntitlementsFeaturesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetEntitlementsFeaturesRequestResult> {
  return requestHandler.execute(
    createRequest(getEntitlementsFeaturesEndpointSchema, payload),
    config
  );
}
