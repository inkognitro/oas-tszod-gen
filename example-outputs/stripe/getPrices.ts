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
import {Price, Error} from '@example-outputs/stripe';

export const getPricesEndpointSchema = {
  path: '/v1/prices',
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

export type GetPricesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    active?: boolean;
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    currency?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    lookup_keys?: string[];
    product?: string;
    recurring?: {
      interval?: 'day' | 'month' | 'week' | 'year';
      meter?: string;
      usage_type?: 'licensed' | 'metered';
    };
    starting_after?: string;
    type?: 'one_time' | 'recurring';
  }
>;

export type GetPricesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Price[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPricesRequestResult = RequestResult<
  GetPricesRequest,
  GetPricesResponse
>;

export function getPrices(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPricesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPricesRequestResult> {
  return requestHandler.execute(
    createRequest(getPricesEndpointSchema, payload),
    config
  );
}
