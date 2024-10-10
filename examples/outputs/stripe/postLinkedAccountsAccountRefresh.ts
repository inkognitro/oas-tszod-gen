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
import {Financial_connections_Account} from './financial_connections';
import {Error} from './schemas';

export const postLinkedAccountsAccountRefreshEndpointSchema = {
  path: '/v1/linked_accounts/{account}/refresh',
  method: 'post',
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

export type PostLinkedAccountsAccountRefreshRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      features: ('balance' | 'ownership' | 'transactions')[];
    }
  >,
  {
    account: string;
  }
>;

export type PostLinkedAccountsAccountRefreshResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Financial_connections_Account>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostLinkedAccountsAccountRefreshRequestResult = RequestResult<
  PostLinkedAccountsAccountRefreshRequest,
  PostLinkedAccountsAccountRefreshResponse
>;

export function postLinkedAccountsAccountRefresh(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostLinkedAccountsAccountRefreshRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostLinkedAccountsAccountRefreshRequestResult> {
  return requestHandler.execute(
    createRequest(postLinkedAccountsAccountRefreshEndpointSchema, payload),
    config
  );
}
