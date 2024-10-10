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

export const postFinancialConnectionsAccountsAccountUnsubscribeEndpointSchema =
  {
    path: '/v1/financial_connections/accounts/{account}/unsubscribe',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      account: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          expand: z.array(z.string()).optional(),
          features: z.array(z.enum(['transactions'])),
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

export type PostFinancialConnectionsAccountsAccountUnsubscribeRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
        features: 'transactions'[];
      }
    >,
    {
      account: string;
    }
  >;

export type PostFinancialConnectionsAccountsAccountUnsubscribeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Financial_connections_Account>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostFinancialConnectionsAccountsAccountUnsubscribeRequestResult =
  RequestResult<
    PostFinancialConnectionsAccountsAccountUnsubscribeRequest,
    PostFinancialConnectionsAccountsAccountUnsubscribeResponse
  >;

export function postFinancialConnectionsAccountsAccountUnsubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostFinancialConnectionsAccountsAccountUnsubscribeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostFinancialConnectionsAccountsAccountUnsubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(
      postFinancialConnectionsAccountsAccountUnsubscribeEndpointSchema,
      payload
    ),
    config
  );
}
