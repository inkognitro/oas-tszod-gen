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
} from '@example-outputs/stripe/core';
import {Entitlements_Active_entitlement, Error} from '@example-outputs/stripe';

export const getEntitlementsActiveEntitlementsEndpointSchema = {
  path: '/v1/entitlements/active_entitlements',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
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
