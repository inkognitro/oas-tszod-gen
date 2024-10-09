import {
  z_Subscription_schedule,
  z_Error,
  Subscription_schedule,
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

export const postSubscriptionSchedulesScheduleEndpointSchema = {
  path: '/v1/subscription_schedules/{schedule}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    schedule: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        default_settings: z
          .object({
            application_fee_percent: z.number().safe().finite().optional(),
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
            billing_cycle_anchor: z
              .enum(['automatic', 'phase_start'])
              .optional(),
            billing_thresholds: z
              .union([
                z.object({
                  amount_gte: z.number().int().safe().finite().optional(),
                  reset_billing_cycle_anchor: z.boolean().optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            collection_method: z
              .enum(['charge_automatically', 'send_invoice'])
              .optional(),
            default_payment_method: z.string().optional(),
            description: z.union([z.string(), z.enum([''])]).optional(),
            invoice_settings: z
              .object({
                account_tax_ids: z
                  .union([z.array(z.string()), z.enum([''])])
                  .optional(),
                days_until_due: z.number().int().safe().finite().optional(),
                issuer: z
                  .object({
                    account: z.string().optional(),
                    type: z.enum(['account', 'self']),
                  })
                  .optional(),
              })
              .optional(),
            on_behalf_of: z.union([z.string(), z.enum([''])]).optional(),
            transfer_data: z
              .union([
                z.object({
                  amount_percent: z.number().safe().finite().optional(),
                  destination: z.string(),
                }),
                z.enum(['']),
              ])
              .optional(),
          })
          .optional(),
        end_behavior: z.enum(['cancel', 'none', 'release', 'renew']).optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        phases: z
          .array(
            z.object({
              add_invoice_items: z
                .array(
                  z.object({
                    discounts: z
                      .array(
                        z.object({
                          coupon: z.string().optional(),
                          discount: z.string().optional(),
                          promotion_code: z.string().optional(),
                        })
                      )
                      .optional(),
                    price: z.string().optional(),
                    price_data: z
                      .object({
                        currency: z.string(),
                        product: z.string(),
                        tax_behavior: z
                          .enum(['exclusive', 'inclusive', 'unspecified'])
                          .optional(),
                        unit_amount: z
                          .number()
                          .int()
                          .safe()
                          .finite()
                          .optional(),
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
              application_fee_percent: z.number().safe().finite().optional(),
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
              billing_cycle_anchor: z
                .enum(['automatic', 'phase_start'])
                .optional(),
              billing_thresholds: z
                .union([
                  z.object({
                    amount_gte: z.number().int().safe().finite().optional(),
                    reset_billing_cycle_anchor: z.boolean().optional(),
                  }),
                  z.enum(['']),
                ])
                .optional(),
              collection_method: z
                .enum(['charge_automatically', 'send_invoice'])
                .optional(),
              coupon: z.string().optional(),
              default_payment_method: z.string().optional(),
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
              end_date: z
                .union([z.number().int().safe().finite(), z.enum(['now'])])
                .optional(),
              invoice_settings: z
                .object({
                  account_tax_ids: z
                    .union([z.array(z.string()), z.enum([''])])
                    .optional(),
                  days_until_due: z.number().int().safe().finite().optional(),
                  issuer: z
                    .object({
                      account: z.string().optional(),
                      type: z.enum(['account', 'self']),
                    })
                    .optional(),
                })
                .optional(),
              items: z.array(
                z.object({
                  billing_thresholds: z
                    .union([
                      z.object({
                        usage_gte: z.number().int().safe().finite(),
                      }),
                      z.enum(['']),
                    ])
                    .optional(),
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
                  metadata: z.record(z.string()).optional(),
                  price: z.string().optional(),
                  price_data: z
                    .object({
                      currency: z.string(),
                      product: z.string(),
                      recurring: z.object({
                        interval: z.enum(['day', 'month', 'week', 'year']),
                        interval_count: z
                          .number()
                          .int()
                          .safe()
                          .finite()
                          .optional(),
                      }),
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
              ),
              iterations: z.number().int().safe().finite().optional(),
              metadata: z.record(z.string()).optional(),
              on_behalf_of: z.string().optional(),
              proration_behavior: z
                .enum(['always_invoice', 'create_prorations', 'none'])
                .optional(),
              start_date: z
                .union([z.number().int().safe().finite(), z.enum(['now'])])
                .optional(),
              transfer_data: z
                .object({
                  amount_percent: z.number().safe().finite().optional(),
                  destination: z.string(),
                })
                .optional(),
              trial: z.boolean().optional(),
              trial_end: z
                .union([z.number().int().safe().finite(), z.enum(['now'])])
                .optional(),
            })
          )
          .optional(),
        proration_behavior: z
          .enum(['always_invoice', 'create_prorations', 'none'])
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Subscription_schedule,
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

export type PostSubscriptionSchedulesScheduleRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      default_settings?: {
        application_fee_percent?: number;
        automatic_tax?: {
          enabled: boolean;
          liability?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        billing_cycle_anchor?: 'automatic' | 'phase_start';
        billing_thresholds?: (
          | {
              amount_gte?: number; // int
              reset_billing_cycle_anchor?: boolean;
            }
          | ''
        ) &
          Partial<{
            amount_gte?: number; // int
            reset_billing_cycle_anchor?: boolean;
          }>;
        collection_method?: 'charge_automatically' | 'send_invoice';
        default_payment_method?: string;
        description?: string | '';
        invoice_settings?: {
          account_tax_ids?: string[] | '';
          days_until_due?: number; // int
          issuer?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        on_behalf_of?: string | '';
        transfer_data?: (
          | {
              amount_percent?: number;
              destination: string;
            }
          | ''
        ) &
          Partial<{
            amount_percent?: number;
            destination: string;
          }>;
      };
      end_behavior?: 'cancel' | 'none' | 'release' | 'renew';
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      phases?: {
        add_invoice_items?: {
          discounts?: {
            coupon?: string;
            discount?: string;
            promotion_code?: string;
          }[];
          price?: string;
          price_data?: {
            currency: string;
            product: string;
            tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
            unit_amount?: number; // int
            unit_amount_decimal?: string; // decimal
          };
          quantity?: number; // int
          tax_rates?: string[] | '';
        }[];
        application_fee_percent?: number;
        automatic_tax?: {
          enabled: boolean;
          liability?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        billing_cycle_anchor?: 'automatic' | 'phase_start';
        billing_thresholds?: (
          | {
              amount_gte?: number; // int
              reset_billing_cycle_anchor?: boolean;
            }
          | ''
        ) &
          Partial<{
            amount_gte?: number; // int
            reset_billing_cycle_anchor?: boolean;
          }>;
        collection_method?: 'charge_automatically' | 'send_invoice';
        coupon?: string;
        default_payment_method?: string;
        default_tax_rates?: string[] | '';
        description?: string | '';
        discounts?:
          | {
              coupon?: string;
              discount?: string;
              promotion_code?: string;
            }[]
          | '';
        end_date?: number | 'now';
        invoice_settings?: {
          account_tax_ids?: string[] | '';
          days_until_due?: number; // int
          issuer?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        items: {
          billing_thresholds?: (
            | {
                usage_gte: number; // int
              }
            | ''
          ) &
            Partial<{
              usage_gte: number; // int
            }>;
          discounts?:
            | {
                coupon?: string;
                discount?: string;
                promotion_code?: string;
              }[]
            | '';
          metadata?: {
            [key: string]: string;
          };
          price?: string;
          price_data?: {
            currency: string;
            product: string;
            recurring: {
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
        iterations?: number; // int
        metadata?: {
          [key: string]: string;
        };
        on_behalf_of?: string;
        proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
        start_date?: number | 'now';
        transfer_data?: {
          amount_percent?: number;
          destination: string;
        };
        trial?: boolean;
        trial_end?: number | 'now';
      }[];
      proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
    }
  >,
  {
    schedule: string;
  }
>;

export type PostSubscriptionSchedulesScheduleResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Subscription_schedule>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSubscriptionSchedulesScheduleRequestResult = RequestResult<
  PostSubscriptionSchedulesScheduleRequest,
  PostSubscriptionSchedulesScheduleResponse
>;

export function postSubscriptionSchedulesSchedule(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSubscriptionSchedulesScheduleRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubscriptionSchedulesScheduleRequestResult> {
  return requestHandler.execute(
    createRequest(postSubscriptionSchedulesScheduleEndpointSchema, payload),
    config
  );
}
