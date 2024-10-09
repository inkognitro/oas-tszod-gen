import {
  z_Billing_portal_Session,
  z_Error,
  Billing_portal_Session,
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

export const postBillingPortalSessionsEndpointSchema = {
  path: '/v1/billing_portal/sessions',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        configuration: z.string().optional(),
        customer: z.string(),
        expand: z.array(z.string()).optional(),
        flow_data: z
          .object({
            after_completion: z
              .object({
                hosted_confirmation: z
                  .object({
                    custom_message: z.string().optional(),
                  })
                  .optional(),
                redirect: z
                  .object({
                    return_url: z.string(),
                  })
                  .optional(),
                type: z.enum([
                  'hosted_confirmation',
                  'portal_homepage',
                  'redirect',
                ]),
              })
              .optional(),
            subscription_cancel: z
              .object({
                retention: z
                  .object({
                    coupon_offer: z.object({
                      coupon: z.string(),
                    }),
                    type: z.enum(['coupon_offer']),
                  })
                  .optional(),
                subscription: z.string(),
              })
              .optional(),
            subscription_update: z
              .object({
                subscription: z.string(),
              })
              .optional(),
            subscription_update_confirm: z
              .object({
                discounts: z
                  .array(
                    z.object({
                      coupon: z.string().optional(),
                      promotion_code: z.string().optional(),
                    })
                  )
                  .optional(),
                items: z.array(
                  z.object({
                    id: z.string(),
                    price: z.string().optional(),
                    quantity: z.number().int().safe().finite().optional(),
                  })
                ),
                subscription: z.string(),
              })
              .optional(),
            type: z.enum([
              'payment_method_update',
              'subscription_cancel',
              'subscription_update',
              'subscription_update_confirm',
            ]),
          })
          .optional(),
        locale: z
          .enum([
            'auto',
            'bg',
            'cs',
            'da',
            'de',
            'el',
            'en',
            'en-AU',
            'en-CA',
            'en-GB',
            'en-IE',
            'en-IN',
            'en-NZ',
            'en-SG',
            'es',
            'es-419',
            'et',
            'fi',
            'fil',
            'fr',
            'fr-CA',
            'hr',
            'hu',
            'id',
            'it',
            'ja',
            'ko',
            'lt',
            'lv',
            'ms',
            'mt',
            'nb',
            'nl',
            'pl',
            'pt',
            'pt-BR',
            'ro',
            'ru',
            'sk',
            'sl',
            'sv',
            'th',
            'tr',
            'vi',
            'zh',
            'zh-HK',
            'zh-TW',
          ])
          .optional(),
        on_behalf_of: z.string().optional(),
        return_url: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Billing_portal_Session,
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

export type PostBillingPortalSessionsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      configuration?: string;
      customer: string;
      expand?: string[];
      flow_data?: {
        after_completion?: {
          hosted_confirmation?: {
            custom_message?: string;
          };
          redirect?: {
            return_url: string;
          };
          type: 'hosted_confirmation' | 'portal_homepage' | 'redirect';
        };
        subscription_cancel?: {
          retention?: {
            coupon_offer: {
              coupon: string;
            };
            type: 'coupon_offer';
          };
          subscription: string;
        };
        subscription_update?: {
          subscription: string;
        };
        subscription_update_confirm?: {
          discounts?: {
            coupon?: string;
            promotion_code?: string;
          }[];
          items: {
            id: string;
            price?: string;
            quantity?: number; // int
          }[];
          subscription: string;
        };
        type:
          | 'payment_method_update'
          | 'subscription_cancel'
          | 'subscription_update'
          | 'subscription_update_confirm';
      };
      locale?:
        | 'auto'
        | 'bg'
        | 'cs'
        | 'da'
        | 'de'
        | 'el'
        | 'en'
        | 'en-AU'
        | 'en-CA'
        | 'en-GB'
        | 'en-IE'
        | 'en-IN'
        | 'en-NZ'
        | 'en-SG'
        | 'es'
        | 'es-419'
        | 'et'
        | 'fi'
        | 'fil'
        | 'fr'
        | 'fr-CA'
        | 'hr'
        | 'hu'
        | 'id'
        | 'it'
        | 'ja'
        | 'ko'
        | 'lt'
        | 'lv'
        | 'ms'
        | 'mt'
        | 'nb'
        | 'nl'
        | 'pl'
        | 'pt'
        | 'pt-BR'
        | 'ro'
        | 'ru'
        | 'sk'
        | 'sl'
        | 'sv'
        | 'th'
        | 'tr'
        | 'vi'
        | 'zh'
        | 'zh-HK'
        | 'zh-TW';
      on_behalf_of?: string;
      return_url?: string;
    }
  >
>;

export type PostBillingPortalSessionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Billing_portal_Session>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingPortalSessionsRequestResult = RequestResult<
  PostBillingPortalSessionsRequest,
  PostBillingPortalSessionsResponse
>;

export function postBillingPortalSessions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingPortalSessionsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingPortalSessionsRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingPortalSessionsEndpointSchema, payload),
    config
  );
}
