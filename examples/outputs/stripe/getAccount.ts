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
import {Account, Error} from './schemas';

export const getAccountEndpointSchema = {
  path: '/v1/account',
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

export type GetAccountRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
  }
>;

export type GetAccountResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountRequestResult = RequestResult<
  GetAccountRequest,
  GetAccountResponse
>;

export function getAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountEndpointSchema, payload),
    config
  );
}
