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
import {Balance, Error} from './schemas';

export const getBalanceEndpointSchema = {
  path: '/v1/balance',
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

export type GetBalanceRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
  }
>;

export type GetBalanceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Balance>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBalanceRequestResult = RequestResult<
  GetBalanceRequest,
  GetBalanceResponse
>;

export function getBalance(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBalanceRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBalanceRequestResult> {
  return requestHandler.execute(
    createRequest(getBalanceEndpointSchema, payload),
    config
  );
}
