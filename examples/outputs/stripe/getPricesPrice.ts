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

export const getPricesPriceEndpointSchema = {
  path: '/v1/prices/{price}',
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

export type GetPricesPriceRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    price: string;
  },
  {
    expand?: string[];
  }
>;

export type GetPricesPriceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Price>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPricesPriceRequestResult = RequestResult<
  GetPricesPriceRequest,
  GetPricesPriceResponse
>;

export function getPricesPrice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPricesPriceRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPricesPriceRequestResult> {
  return requestHandler.execute(
    createRequest(getPricesPriceEndpointSchema, payload),
    config
  );
}
