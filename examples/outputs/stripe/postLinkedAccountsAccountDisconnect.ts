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

export const postLinkedAccountsAccountDisconnectEndpointSchema = {
  path: '/v1/linked_accounts/{account}/disconnect',
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

export type PostLinkedAccountsAccountDisconnectRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    account: string;
  }
>;

export type PostLinkedAccountsAccountDisconnectResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Financial_connections_Account>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostLinkedAccountsAccountDisconnectRequestResult = RequestResult<
  PostLinkedAccountsAccountDisconnectRequest,
  PostLinkedAccountsAccountDisconnectResponse
>;

export function postLinkedAccountsAccountDisconnect(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostLinkedAccountsAccountDisconnectRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostLinkedAccountsAccountDisconnectRequestResult> {
  return requestHandler.execute(
    createRequest(postLinkedAccountsAccountDisconnectEndpointSchema, payload),
    config
  );
}
