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
import {Billing_Alert, Error} from '@example-outputs/stripe';

export const postBillingAlertsEndpointSchema = {
  path: '/v1/billing/alerts',
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

export type PostBillingAlertsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      alert_type: 'usage_threshold';
      expand?: string[];
      filter?: {
        customer?: string;
        subscription?: string;
        subscription_item?: string;
      };
      title: string;
      usage_threshold_config?: {
        gte: number; // int
        meter?: string;
        recurrence: 'one_time';
      };
    }
  >
>;

export type PostBillingAlertsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Alert>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingAlertsRequestResult = RequestResult<
  PostBillingAlertsRequest,
  PostBillingAlertsResponse
>;

export function postBillingAlerts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingAlertsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingAlertsRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingAlertsEndpointSchema, payload),
    config
  );
}
