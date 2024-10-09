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

export const postShippingRatesEndpointSchema = {
  path: '/v1/shipping_rates',
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

export type PostShippingRatesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      delivery_estimate?: {
        maximum?: {
          unit: 'business_day' | 'day' | 'hour' | 'month' | 'week';
          value: number; // int
        };
        minimum?: {
          unit: 'business_day' | 'day' | 'hour' | 'month' | 'week';
          value: number; // int
        };
      };
      display_name: string;
      expand?: string[];
      fixed_amount?: {
        amount: number; // int
        currency: string;
        currency_options?: {
          [key: string]: {
            amount: number; // int
            tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
          };
        };
      };
      metadata?: {
        [key: string]: string;
      };
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
      tax_code?: string;
      type?: 'fixed_amount';
    }
  >
>;

export type PostShippingRatesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Shipping_rate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostShippingRatesRequestResult = RequestResult<
  PostShippingRatesRequest,
  PostShippingRatesResponse
>;

export function postShippingRates(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostShippingRatesRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostShippingRatesRequestResult> {
  return requestHandler.execute(
    createRequest(postShippingRatesEndpointSchema, payload),
    config
  );
}
