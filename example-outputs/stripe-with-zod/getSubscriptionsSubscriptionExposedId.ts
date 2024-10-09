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

export const getSubscriptionsSubscriptionExposedIdEndpointSchema = {
  path: '/v1/subscriptions/{subscription_exposed_id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    subscription_exposed_id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
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

export type GetSubscriptionsSubscriptionExposedIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    subscription_exposed_id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetSubscriptionsSubscriptionExposedIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Subscription>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSubscriptionsSubscriptionExposedIdRequestResult = RequestResult<
  GetSubscriptionsSubscriptionExposedIdRequest,
  GetSubscriptionsSubscriptionExposedIdResponse
>;

export function getSubscriptionsSubscriptionExposedId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSubscriptionsSubscriptionExposedIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubscriptionsSubscriptionExposedIdRequestResult> {
  return requestHandler.execute(
    createRequest(getSubscriptionsSubscriptionExposedIdEndpointSchema, payload),
    config
  );
}
