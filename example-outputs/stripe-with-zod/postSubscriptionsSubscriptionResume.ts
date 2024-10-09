import {
  z_Subscription,
  z_Error,
  Subscription,
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

export const postSubscriptionsSubscriptionResumeEndpointSchema = {
  path: '/v1/subscriptions/{subscription}/resume',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    subscription: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        billing_cycle_anchor: z.enum(['now', 'unchanged']).optional(),
        expand: z.array(z.string()).optional(),
        proration_behavior: z
          .enum(['always_invoice', 'create_prorations', 'none'])
          .optional(),
        proration_date: z.number().int().safe().finite().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Subscription,
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

export type PostSubscriptionsSubscriptionResumeRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      billing_cycle_anchor?: 'now' | 'unchanged';
      expand?: string[];
      proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
      proration_date?: number; // int
    }
  >,
  {
    subscription: string;
  }
>;

export type PostSubscriptionsSubscriptionResumeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Subscription>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSubscriptionsSubscriptionResumeRequestResult = RequestResult<
  PostSubscriptionsSubscriptionResumeRequest,
  PostSubscriptionsSubscriptionResumeResponse
>;

export function postSubscriptionsSubscriptionResume(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSubscriptionsSubscriptionResumeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubscriptionsSubscriptionResumeRequestResult> {
  return requestHandler.execute(
    createRequest(postSubscriptionsSubscriptionResumeEndpointSchema, payload),
    config
  );
}
