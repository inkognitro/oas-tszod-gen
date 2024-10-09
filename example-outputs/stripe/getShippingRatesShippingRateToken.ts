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
import {Shipping_rate, Error} from '@example-outputs/stripe';

export const getShippingRatesShippingRateTokenEndpointSchema = {
  path: '/v1/shipping_rates/{shipping_rate_token}',
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

export type GetShippingRatesShippingRateTokenRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    shipping_rate_token: string;
  },
  {
    expand?: string[];
  }
>;

export type GetShippingRatesShippingRateTokenResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Shipping_rate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetShippingRatesShippingRateTokenRequestResult = RequestResult<
  GetShippingRatesShippingRateTokenRequest,
  GetShippingRatesShippingRateTokenResponse
>;

export function getShippingRatesShippingRateToken(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetShippingRatesShippingRateTokenRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetShippingRatesShippingRateTokenRequestResult> {
  return requestHandler.execute(
    createRequest(getShippingRatesShippingRateTokenEndpointSchema, payload),
    config
  );
}
