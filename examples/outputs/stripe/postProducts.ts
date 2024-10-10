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
import {Product, Error} from './schemas';

export const postProductsEndpointSchema = {
  path: '/v1/products',
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

export type PostProductsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      default_price_data?: {
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
        recurring?: {
          interval: 'day' | 'month' | 'week' | 'year';
          interval_count?: number; // int
        };
        tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
        unit_amount?: number; // int
        unit_amount_decimal?: string; // decimal
      };
      description?: string;
      expand?: string[];
      id?: string;
      images?: string[];
      marketing_features?: {
        name: string;
      }[];
      metadata?: {
        [key: string]: string;
      };
      name: string;
      package_dimensions?: {
        height: number;
        length: number;
        weight: number;
        width: number;
      };
      shippable?: boolean;
      statement_descriptor?: string;
      tax_code?: string;
      unit_label?: string;
      url?: string;
    }
  >
>;

export type PostProductsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Product>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostProductsRequestResult = RequestResult<
  PostProductsRequest,
  PostProductsResponse
>;

export function postProducts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostProductsRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostProductsRequestResult> {
  return requestHandler.execute(
    createRequest(postProductsEndpointSchema, payload),
    config
  );
}
