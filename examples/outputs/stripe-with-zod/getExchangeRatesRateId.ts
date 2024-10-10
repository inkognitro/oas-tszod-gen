import {z_Exchange_rate, z_Error, Exchange_rate, Error} from './schemas';
import {z} from 'zod';
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

export const getExchangeRatesRateIdEndpointSchema = {
  path: '/v1/exchange_rates/{rate_id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    rate_id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Exchange_rate,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
