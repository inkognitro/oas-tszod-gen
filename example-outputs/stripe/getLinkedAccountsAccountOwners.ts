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
import {
  Financial_connections_Account_owner,
  Error,
} from '@example-outputs/stripe';

export const getLinkedAccountsAccountOwnersEndpointSchema = {
  path: '/v1/linked_accounts/{account}/owners',
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

export type GetLinkedAccountsAccountOwnersRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    ownership: string;
    starting_after?: string;
  }
>;

export type GetLinkedAccountsAccountOwnersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Financial_connections_Account_owner[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetLinkedAccountsAccountOwnersRequestResult = RequestResult<
  GetLinkedAccountsAccountOwnersRequest,
  GetLinkedAccountsAccountOwnersResponse
>;

export function getLinkedAccountsAccountOwners(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetLinkedAccountsAccountOwnersRequest,
    'pathParams' | 'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetLinkedAccountsAccountOwnersRequestResult> {
  return requestHandler.execute(
    createRequest(getLinkedAccountsAccountOwnersEndpointSchema, payload),
    config
  );
}
