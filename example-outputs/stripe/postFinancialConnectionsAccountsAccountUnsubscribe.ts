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

export const postFinancialConnectionsAccountsAccountUnsubscribeEndpointSchema =
  {
    path: '/v1/financial_connections/accounts/{account}/unsubscribe',
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
