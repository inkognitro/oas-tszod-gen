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

export const getSubscriptionsSubscriptionExposedIdEndpointSchema = {
  path: '/v1/subscriptions/{subscription_exposed_id}',
  method: 'get',
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
