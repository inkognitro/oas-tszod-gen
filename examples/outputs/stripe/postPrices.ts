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
} from './core';
import {Price, Error} from './schemas';

export const postPricesEndpointSchema = {
  path: '/v1/prices',
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

export type PostPricesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      billing_scheme?: 'per_unit' | 'tiered';
      currency: string;
      currency_options?: {
        [key: string]: {
          custom_unit_amount?: {
            enabled: boolean;
            maximum?: number; // int
            minimum?: number; // int
            preset?: number; // int
          };
          tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
          tiers?: {
            flat_amount?: number; // int
            flat_amount_decimal?: string; // decimal
            unit_amount?: number; // int
            unit_amount_decimal?: string; // decimal
            up_to: 'inf' | number;
          }[];
          unit_amount?: number; // int
          unit_amount_decimal?: string; // decimal
        };
      };
      custom_unit_amount?: {
        enabled: boolean;
        maximum?: number; // int
        minimum?: number; // int
        preset?: number; // int
      };
      expand?: string[];
      lookup_key?: string;
      metadata?: {
        [key: string]: string;
      };
      nickname?: string;
      product?: string;
      product_data?: {
        active?: boolean;
        id?: string;
        metadata?: {
          [key: string]: string;
        };
        name: string;
        statement_descriptor?: string;
        tax_code?: string;
        unit_label?: string;
      };
      recurring?: {
        aggregate_usage?: 'last_during_period' | 'last_ever' | 'max' | 'sum';
        interval: 'day' | 'month' | 'week' | 'year';
        interval_count?: number; // int
        meter?: string;
        usage_type?: 'licensed' | 'metered';
      };
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
      tiers?: {
        flat_amount?: number; // int
        flat_amount_decimal?: string; // decimal
        unit_amount?: number; // int
        unit_amount_decimal?: string; // decimal
        up_to: 'inf' | number;
      }[];
      tiers_mode?: 'graduated' | 'volume';
      transfer_lookup_key?: boolean;
      transform_quantity?: {
        divide_by: number; // int
        round: 'down' | 'up';
      };
      unit_amount?: number; // int
      unit_amount_decimal?: string; // decimal
    }
  >
>;

export type PostPricesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Price>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPricesRequestResult = RequestResult<
  PostPricesRequest,
  PostPricesResponse
>;

export function postPrices(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostPricesRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostPricesRequestResult> {
  return requestHandler.execute(
    createRequest(postPricesEndpointSchema, payload),
    config
  );
}
