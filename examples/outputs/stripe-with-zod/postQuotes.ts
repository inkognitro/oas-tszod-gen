import {z_Quote, z_Error, Quote, Error} from './schemas';
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

export const postQuotesEndpointSchema = {
  path: '/v1/quotes',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        application_fee_amount: z
          .union([z.number().int().safe().finite(), z.enum([''])])
          .optional(),
        application_fee_percent: z
          .union([z.number().safe().finite(), z.enum([''])])
          .optional(),
        automatic_tax: z
          .object({
            enabled: z.boolean(),
            liability: z
              .object({
                account: z.string().optional(),
                type: z.enum(['account', 'self']),
              })
              .optional(),
          })
          .optional(),
        collection_method: z
          .enum(['charge_automatically', 'send_invoice'])
          .optional(),
        customer: z.string().optional(),
        default_tax_rates: z
          .union([z.array(z.string()), z.enum([''])])
          .optional(),
        description: z.union([z.string(), z.enum([''])]).optional(),
        discounts: z
          .union([
            z.array(
              z.object({
                coupon: z.string().optional(),
                discount: z.string().optional(),
                promotion_code: z.string().optional(),
              })
            ),
            z.enum(['']),
          ])
          .optional(),
        expand: z.array(z.string()).optional(),
        expires_at: z.number().int().safe().finite().optional(),
        footer: z.union([z.string(), z.enum([''])]).optional(),
        from_quote: z
          .object({
            is_revision: z.boolean().optional(),
            quote: z.string(),
          })
          .optional(),
        header: z.union([z.string(), z.enum([''])]).optional(),
        invoice_settings: z
          .object({
            days_until_due: z.number().int().safe().finite().optional(),
            issuer: z
              .object({
                account: z.string().optional(),
                type: z.enum(['account', 'self']),
              })
              .optional(),
          })
          .optional(),
        line_items: z
          .array(
            z.object({
              discounts: z
                .union([
                  z.array(
                    z.object({
                      coupon: z.string().optional(),
                      discount: z.string().optional(),
                      promotion_code: z.string().optional(),
                    })
                  ),
                  z.enum(['']),
                ])
                .optional(),
              price: z.string().optional(),
              price_data: z
                .object({
                  currency: z.string(),
                  product: z.string(),
                  recurring: z
                    .object({
                      interval: z.enum(['day', 'month', 'week', 'year']),
                      interval_count: z
                        .number()
                        .int()
                        .safe()
                        .finite()
                        .optional(),
                    })
                    .optional(),
                  tax_behavior: z
                    .enum(['exclusive', 'inclusive', 'unspecified'])
                    .optional(),
                  unit_amount: z.number().int().safe().finite().optional(),
                  unit_amount_decimal: z.string().optional(),
                })
                .optional(),
              quantity: z.number().int().safe().finite().optional(),
              tax_rates: z
                .union([z.array(z.string()), z.enum([''])])
                .optional(),
            })
          )
          .optional(),
        metadata: z.record(z.string()).optional(),
        on_behalf_of: z.union([z.string(), z.enum([''])]).optional(),
        subscription_data: z
          .object({
            description: z.string().optional(),
            effective_date: z
              .union([
                z.enum(['current_period_end']),
                z.number().int().safe().finite(),
                z.enum(['']),
              ])
              .optional(),
            metadata: z.record(z.string()).optional(),
            trial_period_days: z
              .union([z.number().int().safe().finite(), z.enum([''])])
              .optional(),
          })
          .optional(),
        test_clock: z.string().optional(),
        transfer_data: z
          .union([
            z.object({
              amount: z.number().int().safe().finite().optional(),
              amount_percent: z.number().safe().finite().optional(),
              destination: z.string(),
            }),
            z.enum(['']),
          ])
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Quote,
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

export type PostQuotesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      application_fee_amount?: number | '';
      application_fee_percent?: number | '';
      automatic_tax?: {
        enabled: boolean;
        liability?: {
          account?: string;
          type: 'account' | 'self';
        };
      };
      collection_method?: 'charge_automatically' | 'send_invoice';
      customer?: string;
      default_tax_rates?: string[] | '';
      description?: string | '';
      discounts?:
        | {
            coupon?: string;
            discount?: string;
            promotion_code?: string;
          }[]
        | '';
      expand?: string[];
      expires_at?: number; // int
      footer?: string | '';
      from_quote?: {
        is_revision?: boolean;
        quote: string;
      };
      header?: string | '';
      invoice_settings?: {
        days_until_due?: number; // int
        issuer?: {
          account?: string;
          type: 'account' | 'self';
        };
      };
      line_items?: {
        discounts?:
          | {
              coupon?: string;
              discount?: string;
              promotion_code?: string;
            }[]
          | '';
        price?: string;
        price_data?: {
          currency: string;
          product: string;
          recurring?: {
            interval: 'day' | 'month' | 'week' | 'year';
            interval_count?: number; // int
          };
          tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
          unit_amount?: number; // int
          unit_amount_decimal?: string; // decimal
        };
        quantity?: number; // int
        tax_rates?: string[] | '';
      }[];
      metadata?: {
        [key: string]: string;
      };
      on_behalf_of?: string | '';
      subscription_data?: {
        description?: string;
        effective_date?: 'current_period_end' | number | '';
        metadata?: {
          [key: string]: string;
        };
        trial_period_days?: number | '';
      };
      test_clock?: string;
      transfer_data?: (
        | {
            amount?: number; // int
            amount_percent?: number;
            destination: string;
          }
        | ''
      ) &
        Partial<{
          amount?: number; // int
          amount_percent?: number;
          destination: string;
        }>;
    }
  >
>;

export type PostQuotesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Quote>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostQuotesRequestResult = RequestResult<
  PostQuotesRequest,
  PostQuotesResponse
>;

export function postQuotes(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostQuotesRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostQuotesRequestResult> {
  return requestHandler.execute(
    createRequest(postQuotesEndpointSchema, payload),
    config
  );
}
