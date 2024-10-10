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
import {Subscription, Error} from './schemas';

export const postSubscriptionsSubscriptionResumeEndpointSchema = {
  path: '/v1/subscriptions/{subscription}/resume',
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
