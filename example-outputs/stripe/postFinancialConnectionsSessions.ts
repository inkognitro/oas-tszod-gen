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
import {Financial_connections_Session, Error} from '@example-outputs/stripe';

export const postFinancialConnectionsSessionsEndpointSchema = {
  path: '/v1/financial_connections/sessions',
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

export type PostFinancialConnectionsSessionsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      account_holder: {
        account?: string;
        customer?: string;
        type: 'account' | 'customer';
      };
      expand?: string[];
      filters?: {
        account_subcategories?: (
          | 'checking'
          | 'credit_card'
          | 'line_of_credit'
          | 'mortgage'
          | 'savings'
        )[];
        countries?: string[];
      };
      permissions: (
        | 'balances'
        | 'ownership'
        | 'payment_method'
        | 'transactions'
      )[];
      prefetch?: ('balances' | 'ownership' | 'transactions')[];
      return_url?: string;
    }
  >
>;

export type PostFinancialConnectionsSessionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Financial_connections_Session>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostFinancialConnectionsSessionsRequestResult = RequestResult<
  PostFinancialConnectionsSessionsRequest,
  PostFinancialConnectionsSessionsResponse
>;

export function postFinancialConnectionsSessions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostFinancialConnectionsSessionsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostFinancialConnectionsSessionsRequestResult> {
  return requestHandler.execute(
    createRequest(postFinancialConnectionsSessionsEndpointSchema, payload),
    config
  );
}
