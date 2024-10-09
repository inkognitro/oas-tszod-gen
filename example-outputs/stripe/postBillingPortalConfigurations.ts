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
import {Billing_portal_Configuration, Error} from '@example-outputs/stripe';

export const postBillingPortalConfigurationsEndpointSchema = {
  path: '/v1/billing_portal/configurations',
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
