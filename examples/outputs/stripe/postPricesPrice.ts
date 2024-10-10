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

export const postPricesPriceEndpointSchema = {
  path: '/v1/prices/{price}',
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

export type PostPricesPriceRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      currency_options?:
        | {
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
          }
        | '';
      expand?: string[];
      lookup_key?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      nickname?: string;
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
      transfer_lookup_key?: boolean;
    }
  >,
  {
    price: string;
  }
>;

export type PostPricesPriceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Price>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPricesPriceRequestResult = RequestResult<
  PostPricesPriceRequest,
  PostPricesPriceResponse
>;

export function postPricesPrice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPricesPriceRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPricesPriceRequestResult> {
  return requestHandler.execute(
    createRequest(postPricesPriceEndpointSchema, payload),
    config
  );
}
