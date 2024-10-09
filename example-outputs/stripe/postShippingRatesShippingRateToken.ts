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

export const postShippingRatesShippingRateTokenEndpointSchema = {
  path: '/v1/shipping_rates/{shipping_rate_token}',
  method: 'post',
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

export type PostShippingRatesShippingRateTokenRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      expand?: string[];
      fixed_amount?: {
        currency_options?: {
          [key: string]: {
            amount?: number; // int
            tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
          };
        };
      };
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
    }
  >,
  {
    shipping_rate_token: string;
  }
>;

export type PostShippingRatesShippingRateTokenResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Shipping_rate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostShippingRatesShippingRateTokenRequestResult = RequestResult<
  PostShippingRatesShippingRateTokenRequest,
  PostShippingRatesShippingRateTokenResponse
>;

export function postShippingRatesShippingRateToken(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostShippingRatesShippingRateTokenRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostShippingRatesShippingRateTokenRequestResult> {
  return requestHandler.execute(
    createRequest(postShippingRatesShippingRateTokenEndpointSchema, payload),
    config
  );
}
