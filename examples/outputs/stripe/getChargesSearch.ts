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
import {Charge, Error} from './schemas';

export const getChargesSearchEndpointSchema = {
  path: '/v1/charges/search',
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

export type GetChargesSearchRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
    limit?: number; // int
    page?: string;
    query: string;
  }
>;

export type GetChargesSearchResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Charge[];
          has_more: boolean;
          next_page?: string | null;
          object: 'search_result';
          total_count?: number; // int
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetChargesSearchRequestResult = RequestResult<
  GetChargesSearchRequest,
  GetChargesSearchResponse
>;

export function getChargesSearch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetChargesSearchRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetChargesSearchRequestResult> {
  return requestHandler.execute(
    createRequest(getChargesSearchEndpointSchema, payload),
    config
  );
}
