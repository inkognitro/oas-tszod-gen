import {
  z_Financial_connections_Account,
  Financial_connections_Account,
} from './financial_connections';
import {z_Error, Error} from './schemas';
import {z} from 'zod';
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

export const postLinkedAccountsAccountRefreshEndpointSchema = {
  path: '/v1/linked_accounts/{account}/refresh',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    account: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        features: z.array(z.enum(['balance', 'ownership', 'transactions'])),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Financial_connections_Account,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
