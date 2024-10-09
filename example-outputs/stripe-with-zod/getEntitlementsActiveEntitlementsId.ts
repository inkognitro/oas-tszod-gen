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

export const getEntitlementsActiveEntitlementsIdEndpointSchema = {
  path: '/v1/entitlements/active_entitlements/{id}',
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
          zodSchema: z_Entitlements_Active_entitlement,
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

export type GetEntitlementsActiveEntitlementsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetEntitlementsActiveEntitlementsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Entitlements_Active_entitlement>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetEntitlementsActiveEntitlementsIdRequestResult = RequestResult<
  GetEntitlementsActiveEntitlementsIdRequest,
  GetEntitlementsActiveEntitlementsIdResponse
>;

export function getEntitlementsActiveEntitlementsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetEntitlementsActiveEntitlementsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetEntitlementsActiveEntitlementsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getEntitlementsActiveEntitlementsIdEndpointSchema, payload),
    config
  );
}
