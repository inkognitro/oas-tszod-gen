import {
  z_Financial_connections_Account,
  z_Error,
  Financial_connections_Account,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postLinkedAccountsAccountDisconnectEndpointSchema = {
  path: '/v1/linked_accounts/{account}/disconnect',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    account: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
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
