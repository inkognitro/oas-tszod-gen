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
import {External_account, Error} from '@example-outputs/stripe';

export const getAccountsAccountExternalAccountsIdEndpointSchema = {
  path: '/v1/accounts/{account}/external_accounts/{id}',
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

export type GetAccountsAccountExternalAccountsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetAccountsAccountExternalAccountsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', External_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountExternalAccountsIdRequestResult = RequestResult<
  GetAccountsAccountExternalAccountsIdRequest,
  GetAccountsAccountExternalAccountsIdResponse
>;

export function getAccountsAccountExternalAccountsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountExternalAccountsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountExternalAccountsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountExternalAccountsIdEndpointSchema, payload),
    config
  );
}
