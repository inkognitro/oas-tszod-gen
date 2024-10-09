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
import {Entitlements_Feature, Error} from '@example-outputs/stripe';

export const getEntitlementsFeaturesEndpointSchema = {
  path: '/v1/entitlements/features',
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
