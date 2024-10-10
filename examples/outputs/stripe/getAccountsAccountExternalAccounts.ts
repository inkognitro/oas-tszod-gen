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
import {Bank_account, Card, Error} from './schemas';

export const getAccountsAccountExternalAccountsEndpointSchema = {
  path: '/v1/accounts/{account}/external_accounts',
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

export type GetAccountsAccountExternalAccountsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    object?: 'bank_account' | 'card';
    starting_after?: string;
  }
>;

export type GetAccountsAccountExternalAccountsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: ((Bank_account | Card) &
            (Partial<Bank_account> & Partial<Card>))[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountExternalAccountsRequestResult = RequestResult<
  GetAccountsAccountExternalAccountsRequest,
  GetAccountsAccountExternalAccountsResponse
>;

export function getAccountsAccountExternalAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountExternalAccountsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountExternalAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountExternalAccountsEndpointSchema, payload),
    config
  );
}
