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
import {Billing_portal_Session, Error} from '@example-outputs/stripe';

export const postBillingPortalSessionsEndpointSchema = {
  path: '/v1/billing_portal/sessions',
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
