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

export const postLinkAccountSessionsEndpointSchema = {
  path: '/v1/link_account_sessions',
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

export type PostLinkAccountSessionsRequest = RequestUnion<
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

export type PostLinkAccountSessionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Financial_connections_Session>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostLinkAccountSessionsRequestResult = RequestResult<
  PostLinkAccountSessionsRequest,
  PostLinkAccountSessionsResponse
>;

export function postLinkAccountSessions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostLinkAccountSessionsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostLinkAccountSessionsRequestResult> {
  return requestHandler.execute(
    createRequest(postLinkAccountSessionsEndpointSchema, payload),
    config
  );
}
