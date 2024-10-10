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

export const getLinkedAccountsEndpointSchema = {
  path: '/v1/linked_accounts',
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

export type GetLinkedAccountsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    account_holder?: {
      account?: string;
      customer?: string;
    };
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    session?: string;
    starting_after?: string;
  }
>;

export type GetLinkedAccountsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Financial_connections_Account[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetLinkedAccountsRequestResult = RequestResult<
  GetLinkedAccountsRequest,
  GetLinkedAccountsResponse
>;

export function getLinkedAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetLinkedAccountsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetLinkedAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(getLinkedAccountsEndpointSchema, payload),
    config
  );
}
