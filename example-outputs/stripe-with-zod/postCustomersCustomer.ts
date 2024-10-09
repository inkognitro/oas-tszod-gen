import {
  z_Customer,
  z_Error,
  Customer,
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

export const postCustomersCustomerEndpointSchema = {
  path: '/v1/customers/{customer}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    customer: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
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
        balance: z.number().int().safe().finite().optional(),
        bank_account: z
          .union([
            z.object({
              account_holder_name: z.string().optional(),
              account_holder_type: z.enum(['company', 'individual']).optional(),
              account_number: z.string(),
              country: z.string(),
              currency: z.string().optional(),
              object: z.enum(['bank_account']).optional(),
              routing_number: z.string().optional(),
            }),
            z.string(),
          ])
          .optional(),
        card: z
          .union([
            z.object({
              address_city: z.string().optional(),
              address_country: z.string().optional(),
              address_line1: z.string().optional(),
              address_line2: z.string().optional(),
              address_state: z.string().optional(),
              address_zip: z.string().optional(),
              cvc: z.string().optional(),
              exp_month: z.number().int().safe().finite(),
              exp_year: z.number().int().safe().finite(),
              metadata: z.record(z.string()).optional(),
              name: z.string().optional(),
              number: z.string(),
              object: z.enum(['card']).optional(),
            }),
            z.string(),
          ])
          .optional(),
        cash_balance: z
          .object({
            settings: z
              .object({
                reconciliation_mode: z
                  .enum(['automatic', 'manual', 'merchant_default'])
                  .optional(),
              })
              .optional(),
          })
          .optional(),
        coupon: z.string().optional(),
        default_alipay_account: z.string().optional(),
        default_bank_account: z.string().optional(),
        default_card: z.string().optional(),
        default_source: z.string().optional(),
        description: z.string().optional(),
        email: z.string().optional(),
        expand: z.array(z.string()).optional(),
        invoice_prefix: z.string().optional(),
        invoice_settings: z
          .object({
            custom_fields: z
              .union([
                z.array(
                  z.object({
                    name: z.string(),
                    value: z.string(),
                  })
                ),
                z.enum(['']),
              ])
              .optional(),
            default_payment_method: z.string().optional(),
            footer: z.string().optional(),
            rendering_options: z
              .union([
                z.object({
                  amount_tax_display: z
                    .enum(['', 'exclude_tax', 'include_inclusive_tax'])
                    .optional(),
                  template: z.string().optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
          })
          .optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        name: z.string().optional(),
        next_invoice_sequence: z.number().int().safe().finite().optional(),
        phone: z.string().optional(),
        preferred_locales: z.array(z.string()).optional(),
        promotion_code: z.string().optional(),
        shipping: z
          .union([
            z.object({
              address: z.object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
              }),
              name: z.string(),
              phone: z.string().optional(),
            }),
            z.enum(['']),
          ])
          .optional(),
        source: z.string().optional(),
        tax: z
          .object({
            ip_address: z.union([z.string(), z.enum([''])]).optional(),
            validate_location: z.enum(['deferred', 'immediately']).optional(),
          })
          .optional(),
        tax_exempt: z.enum(['', 'exempt', 'none', 'reverse']).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Customer,
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
