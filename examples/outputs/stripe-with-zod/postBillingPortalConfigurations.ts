import {
  z_Billing_portal_Configuration,
  Billing_portal_Configuration,
} from './billing_portal';
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

export const postBillingPortalConfigurationsEndpointSchema = {
  path: '/v1/billing_portal/configurations',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        business_profile: z.object({
          headline: z.union([z.string(), z.enum([''])]).optional(),
          privacy_policy_url: z.string().optional(),
          terms_of_service_url: z.string().optional(),
        }),
        default_return_url: z.union([z.string(), z.enum([''])]).optional(),
        expand: z.array(z.string()).optional(),
        features: z.object({
          customer_update: z
            .object({
              allowed_updates: z
                .union([
                  z.array(
                    z.enum([
                      'address',
                      'email',
                      'name',
                      'phone',
                      'shipping',
                      'tax_id',
                    ])
                  ),
                  z.enum(['']),
                ])
                .optional(),
              enabled: z.boolean(),
            })
            .optional(),
          invoice_history: z
            .object({
              enabled: z.boolean(),
            })
            .optional(),
          payment_method_update: z
            .object({
              enabled: z.boolean(),
            })
            .optional(),
          subscription_cancel: z
            .object({
              cancellation_reason: z
                .object({
                  enabled: z.boolean(),
                  options: z.union([
                    z.array(
                      z.enum([
                        'customer_service',
                        'low_quality',
                        'missing_features',
                        'other',
                        'switched_service',
                        'too_complex',
                        'too_expensive',
                        'unused',
                      ])
                    ),
                    z.enum(['']),
                  ]),
                })
                .optional(),
              enabled: z.boolean(),
              mode: z.enum(['at_period_end', 'immediately']).optional(),
              proration_behavior: z
                .enum(['always_invoice', 'create_prorations', 'none'])
                .optional(),
            })
            .optional(),
          subscription_update: z
            .object({
              default_allowed_updates: z.union([
                z.array(z.enum(['price', 'promotion_code', 'quantity'])),
                z.enum(['']),
              ]),
              enabled: z.boolean(),
              products: z.union([
                z.array(
                  z.object({
                    prices: z.array(z.string()),
                    product: z.string(),
                  })
                ),
                z.enum(['']),
              ]),
              proration_behavior: z
                .enum(['always_invoice', 'create_prorations', 'none'])
                .optional(),
            })
            .optional(),
        }),
        login_page: z
          .object({
            enabled: z.boolean(),
          })
          .optional(),
        metadata: z.record(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Billing_portal_Configuration,
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

export type PostBillingPortalConfigurationsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      business_profile: {
        headline?: string | '';
        privacy_policy_url?: string;
        terms_of_service_url?: string;
      };
      default_return_url?: string | '';
      expand?: string[];
      features: {
        customer_update?: {
          allowed_updates?:
            | ('address' | 'email' | 'name' | 'phone' | 'shipping' | 'tax_id')[]
            | '';
          enabled: boolean;
        };
        invoice_history?: {
          enabled: boolean;
        };
        payment_method_update?: {
          enabled: boolean;
        };
        subscription_cancel?: {
          cancellation_reason?: {
            enabled: boolean;
            options:
              | (
                  | 'customer_service'
                  | 'low_quality'
                  | 'missing_features'
                  | 'other'
                  | 'switched_service'
                  | 'too_complex'
                  | 'too_expensive'
                  | 'unused'
                )[]
              | '';
          };
          enabled: boolean;
          mode?: 'at_period_end' | 'immediately';
          proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
        };
        subscription_update?: {
          default_allowed_updates:
            | ('price' | 'promotion_code' | 'quantity')[]
            | '';
          enabled: boolean;
          products:
            | {
                prices: string[];
                product: string;
              }[]
            | '';
          proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
        };
      };
      login_page?: {
        enabled: boolean;
      };
      metadata?: {
        [key: string]: string;
      };
    }
  >
>;

export type PostBillingPortalConfigurationsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Billing_portal_Configuration>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingPortalConfigurationsRequestResult = RequestResult<
  PostBillingPortalConfigurationsRequest,
  PostBillingPortalConfigurationsResponse
>;

export function postBillingPortalConfigurations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingPortalConfigurationsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingPortalConfigurationsRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingPortalConfigurationsEndpointSchema, payload),
    config
  );
}
