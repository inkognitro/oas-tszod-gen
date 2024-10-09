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
import {Treasury_Outbound_payment, Error} from '@example-outputs/stripe';

export const postTreasuryOutboundPaymentsEndpointSchema = {
  path: '/v1/treasury/outbound_payments',
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
