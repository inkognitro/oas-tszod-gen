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
import {Financial_connections_Account, Error} from '@example-outputs/stripe';

export const getLinkedAccountsAccountEndpointSchema = {
  path: '/v1/linked_accounts/{account}',
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

export type GetLinkedAccountsAccountRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  },
  {
    expand?: string[];
  }
>;

export type GetLinkedAccountsAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Financial_connections_Account>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetLinkedAccountsAccountRequestResult = RequestResult<
  GetLinkedAccountsAccountRequest,
  GetLinkedAccountsAccountResponse
>;

export function getLinkedAccountsAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetLinkedAccountsAccountRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetLinkedAccountsAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getLinkedAccountsAccountEndpointSchema, payload),
    config
  );
}
