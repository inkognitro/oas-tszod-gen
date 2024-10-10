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
import {Exchange_rate, Error} from './schemas';

export const getExchangeRatesRateIdEndpointSchema = {
  path: '/v1/exchange_rates/{rate_id}',
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

export type GetExchangeRatesRateIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    rate_id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetExchangeRatesRateIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Exchange_rate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetExchangeRatesRateIdRequestResult = RequestResult<
  GetExchangeRatesRateIdRequest,
  GetExchangeRatesRateIdResponse
>;

export function getExchangeRatesRateId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetExchangeRatesRateIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetExchangeRatesRateIdRequestResult> {
  return requestHandler.execute(
    createRequest(getExchangeRatesRateIdEndpointSchema, payload),
    config
  );
}
