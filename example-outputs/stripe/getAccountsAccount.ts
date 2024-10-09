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
import {Account, Error} from '@example-outputs/stripe';

export const getAccountsAccountEndpointSchema = {
  path: '/v1/accounts/{account}',
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

export type GetAccountsAccountRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  },
  {
    expand?: string[];
  }
>;

export type GetAccountsAccountResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountRequestResult = RequestResult<
  GetAccountsAccountRequest,
  GetAccountsAccountResponse
>;

export function getAccountsAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountEndpointSchema, payload),
    config
  );
}
