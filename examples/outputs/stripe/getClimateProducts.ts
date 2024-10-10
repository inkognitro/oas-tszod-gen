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
import {Climate_Product} from './climate';
import {Error} from './schemas';

export const getClimateProductsEndpointSchema = {
  path: '/v1/climate/products',
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

export type GetClimateProductsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetClimateProductsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Climate_Product[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetClimateProductsRequestResult = RequestResult<
  GetClimateProductsRequest,
  GetClimateProductsResponse
>;

export function getClimateProducts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetClimateProductsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetClimateProductsRequestResult> {
  return requestHandler.execute(
    createRequest(getClimateProductsEndpointSchema, payload),
    config
  );
}
