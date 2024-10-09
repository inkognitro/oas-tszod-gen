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
import {Customer, Error} from '@example-outputs/stripe';

export const postCustomersCustomerEndpointSchema = {
  path: '/v1/customers/{customer}',
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

export type PostCustomersCustomerRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
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
      balance?: number; // int
      bank_account?: (
        | {
            account_holder_name?: string;
            account_holder_type?: 'company' | 'individual';
            account_number: string;
            country: string;
            currency?: string;
            object?: 'bank_account';
            routing_number?: string;
          }
        | string
      ) &
        Partial<{
          account_holder_name?: string;
          account_holder_type?: 'company' | 'individual';
          account_number: string;
          country: string;
          currency?: string;
          object?: 'bank_account';
          routing_number?: string;
        }>;
      card?: (
        | {
            address_city?: string;
            address_country?: string;
            address_line1?: string;
            address_line2?: string;
            address_state?: string;
            address_zip?: string;
            cvc?: string;
            exp_month: number; // int
            exp_year: number; // int
            metadata?: {
              [key: string]: string;
            };
            name?: string;
            number: string;
            object?: 'card';
          }
        | string
      ) &
        Partial<{
          address_city?: string;
          address_country?: string;
          address_line1?: string;
          address_line2?: string;
          address_state?: string;
          address_zip?: string;
          cvc?: string;
          exp_month: number; // int
          exp_year: number; // int
          metadata?: {
            [key: string]: string;
          };
          name?: string;
          number: string;
          object?: 'card';
        }>;
      cash_balance?: {
        settings?: {
          reconciliation_mode?: 'automatic' | 'manual' | 'merchant_default';
        };
      };
      coupon?: string;
      default_alipay_account?: string;
      default_bank_account?: string;
      default_card?: string;
      default_source?: string;
      description?: string;
      email?: string;
      expand?: string[];
      invoice_prefix?: string;
      invoice_settings?: {
        custom_fields?:
          | {
              name: string;
              value: string;
            }[]
          | '';
        default_payment_method?: string;
        footer?: string;
        rendering_options?: (
          | {
              amount_tax_display?: '' | 'exclude_tax' | 'include_inclusive_tax';
              template?: string;
            }
          | ''
        ) &
          Partial<{
            amount_tax_display?: '' | 'exclude_tax' | 'include_inclusive_tax';
            template?: string;
          }>;
      };
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      name?: string;
      next_invoice_sequence?: number; // int
      phone?: string;
      preferred_locales?: string[];
      promotion_code?: string;
      shipping?: (
        | {
            address: {
              city?: string;
              country?: string;
              line1?: string;
              line2?: string;
              postal_code?: string;
              state?: string;
            };
            name: string;
            phone?: string;
          }
        | ''
      ) &
        Partial<{
          address: {
            city?: string;
            country?: string;
            line1?: string;
            line2?: string;
            postal_code?: string;
            state?: string;
          };
          name: string;
          phone?: string;
        }>;
      source?: string;
      tax?: {
        ip_address?: string | '';
        validate_location?: 'deferred' | 'immediately';
      };
      tax_exempt?: '' | 'exempt' | 'none' | 'reverse';
    }
  >,
  {
    customer: string;
  }
>;

export type PostCustomersCustomerResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Customer>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerRequestResult = RequestResult<
  PostCustomersCustomerRequest,
  PostCustomersCustomerResponse
>;

export function postCustomersCustomer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerRequestResult> {
  return requestHandler.execute(
    createRequest(postCustomersCustomerEndpointSchema, payload),
    config
  );
}
