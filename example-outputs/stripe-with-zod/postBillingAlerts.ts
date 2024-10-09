import {
  z_Billing_Alert,
  z_Error,
  Billing_Alert,
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

export const postBillingAlertsEndpointSchema = {
  path: '/v1/billing/alerts',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        alert_type: z.enum(['usage_threshold']),
        expand: z.array(z.string()).optional(),
        filter: z
          .object({
            customer: z.string().optional(),
            subscription: z.string().optional(),
            subscription_item: z.string().optional(),
          })
          .optional(),
        title: z.string(),
        usage_threshold_config: z
          .object({
            gte: z.number().int().safe().finite(),
            meter: z.string().optional(),
            recurrence: z.enum(['one_time']),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Billing_Alert,
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
