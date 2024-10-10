import {
  z_Financial_connections_Session,
  Financial_connections_Session,
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

export const postFinancialConnectionsSessionsEndpointSchema = {
  path: '/v1/financial_connections/sessions',
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
