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

export const postFinancialConnectionsAccountsAccountDisconnectEndpointSchema = {
  path: '/v1/financial_connections/accounts/{account}/disconnect',
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

export type PostFinancialConnectionsAccountsAccountDisconnectRequest =
  RequestUnion<
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

export type PostFinancialConnectionsAccountsAccountDisconnectResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Financial_connections_Account>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostFinancialConnectionsAccountsAccountDisconnectRequestResult =
  RequestResult<
    PostFinancialConnectionsAccountsAccountDisconnectRequest,
    PostFinancialConnectionsAccountsAccountDisconnectResponse
  >;

export function postFinancialConnectionsAccountsAccountDisconnect(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostFinancialConnectionsAccountsAccountDisconnectRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostFinancialConnectionsAccountsAccountDisconnectRequestResult> {
  return requestHandler.execute(
    createRequest(
      postFinancialConnectionsAccountsAccountDisconnectEndpointSchema,
      payload
    ),
    config
  );
}
