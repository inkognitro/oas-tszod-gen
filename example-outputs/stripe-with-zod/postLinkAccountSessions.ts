import {
  z_Financial_connections_Session,
  z_Error,
  Financial_connections_Session,
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

export const postLinkAccountSessionsEndpointSchema = {
  path: '/v1/link_account_sessions',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        account_holder: z.object({
          account: z.string().optional(),
          customer: z.string().optional(),
          type: z.enum(['account', 'customer']),
        }),
        expand: z.array(z.string()).optional(),
        filters: z
          .object({
            account_subcategories: z
              .array(
                z.enum([
                  'checking',
                  'credit_card',
                  'line_of_credit',
                  'mortgage',
                  'savings',
                ])
              )
              .optional(),
            countries: z.array(z.string()).optional(),
          })
          .optional(),
        permissions: z.array(
          z.enum(['balances', 'ownership', 'payment_method', 'transactions'])
        ),
        prefetch: z
          .array(z.enum(['balances', 'ownership', 'transactions']))
          .optional(),
        return_url: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Financial_connections_Session,
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
