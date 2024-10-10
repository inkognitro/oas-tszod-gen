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
import {Payment_intent, Error} from './schemas';

export const getPaymentIntentsSearchEndpointSchema = {
  path: '/v1/payment_intents/search',
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

export type GetPaymentIntentsSearchRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
    limit?: number; // int
    page?: string;
    query: string;
  }
>;

export type GetPaymentIntentsSearchResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Payment_intent[];
          has_more: boolean;
          next_page?: string | null;
          object: 'search_result';
          total_count?: number; // int
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentIntentsSearchRequestResult = RequestResult<
  GetPaymentIntentsSearchRequest,
  GetPaymentIntentsSearchResponse
>;

export function getPaymentIntentsSearch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentIntentsSearchRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentIntentsSearchRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentIntentsSearchEndpointSchema, payload),
    config
  );
}
