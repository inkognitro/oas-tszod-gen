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

export const getEntitlementsFeaturesIdEndpointSchema = {
  path: '/v1/entitlements/features/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
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
          zodSchema: z_Entitlements_Feature,
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

export type GetEntitlementsFeaturesIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetEntitlementsFeaturesIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Entitlements_Feature>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetEntitlementsFeaturesIdRequestResult = RequestResult<
  GetEntitlementsFeaturesIdRequest,
  GetEntitlementsFeaturesIdResponse
>;

export function getEntitlementsFeaturesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetEntitlementsFeaturesIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetEntitlementsFeaturesIdRequestResult> {
  return requestHandler.execute(
    createRequest(getEntitlementsFeaturesIdEndpointSchema, payload),
    config
  );
}
