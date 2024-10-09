import {
  z_Treasury_Outbound_payment,
  z_Error,
  Treasury_Outbound_payment,
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

export const postTreasuryOutboundPaymentsEndpointSchema = {
  path: '/v1/treasury/outbound_payments',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite(),
        currency: z.string(),
        customer: z.string().optional(),
        description: z.string().optional(),
        destination_payment_method: z.string().optional(),
        destination_payment_method_data: z
          .object({
            billing_details: z
              .object({
                address: z
                  .union([
                    z.object({
                      city: z.string().optional(),
                      country: z.string().optional(),
                      line1: z.string().optional(),
                      line2: z.string().optional(),
                      postal_code: z.string().optional(),
                      state: z.string().optional(),
                    }),
                    z.enum(['']),
                  ])
                  .optional(),
                email: z.union([z.string(), z.enum([''])]).optional(),
                name: z.union([z.string(), z.enum([''])]).optional(),
                phone: z.union([z.string(), z.enum([''])]).optional(),
              })
              .optional(),
            financial_account: z.string().optional(),
            metadata: z.record(z.string()).optional(),
            type: z.enum(['financial_account', 'us_bank_account']),
            us_bank_account: z
              .object({
                account_holder_type: z
                  .enum(['company', 'individual'])
                  .optional(),
                account_number: z.string().optional(),
                account_type: z.enum(['checking', 'savings']).optional(),
                financial_connections_account: z.string().optional(),
                routing_number: z.string().optional(),
              })
              .optional(),
          })
          .optional(),
        destination_payment_method_options: z
          .object({
            us_bank_account: z
              .union([
                z.object({
                  network: z.enum(['ach', 'us_domestic_wire']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
          })
          .optional(),
        end_user_details: z
          .object({
            ip_address: z.string().optional(),
            present: z.boolean(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        financial_account: z.string(),
        metadata: z.record(z.string()).optional(),
        statement_descriptor: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Treasury_Outbound_payment,
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

export type PostTreasuryOutboundPaymentsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount: number; // int
      currency: string;
      customer?: string;
      description?: string;
      destination_payment_method?: string;
      destination_payment_method_data?: {
        billing_details?: {
          address?: (
            | {
                city?: string;
                country?: string;
                line1?: string;
                line2?: string;
                postal_code?: string;
                state?: string;
              }
            | ''
          ) &
            Partial<{
              city?: string;
              country?: string;
              line1?: string;
              line2?: string;
              postal_code?: string;
              state?: string;
            }>;
          email?: string | '';
          name?: string | '';
          phone?: string | '';
        };
        financial_account?: string;
        metadata?: {
          [key: string]: string;
        };
        type: 'financial_account' | 'us_bank_account';
        us_bank_account?: {
          account_holder_type?: 'company' | 'individual';
          account_number?: string;
          account_type?: 'checking' | 'savings';
          financial_connections_account?: string;
          routing_number?: string;
        };
      };
      destination_payment_method_options?: {
        us_bank_account?: (
          | {
              network?: 'ach' | 'us_domestic_wire';
            }
          | ''
        ) &
          Partial<{
            network?: 'ach' | 'us_domestic_wire';
          }>;
      };
      end_user_details?: {
        ip_address?: string;
        present: boolean;
      };
      expand?: string[];
      financial_account: string;
      metadata?: {
        [key: string]: string;
      };
      statement_descriptor?: string;
    }
  >
>;

export type PostTreasuryOutboundPaymentsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_payment>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryOutboundPaymentsRequestResult = RequestResult<
  PostTreasuryOutboundPaymentsRequest,
  PostTreasuryOutboundPaymentsResponse
>;

export function postTreasuryOutboundPayments(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryOutboundPaymentsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryOutboundPaymentsRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryOutboundPaymentsEndpointSchema, payload),
    config
  );
}
