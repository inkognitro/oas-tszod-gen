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

export const getEntitlementsFeaturesIdEndpointSchema = {
  path: '/v1/entitlements/features/{id}',
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
