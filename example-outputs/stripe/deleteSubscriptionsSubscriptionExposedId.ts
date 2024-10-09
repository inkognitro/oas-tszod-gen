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
import {Subscription, Error} from '@example-outputs/stripe';

export const deleteSubscriptionsSubscriptionExposedIdEndpointSchema = {
  path: '/v1/subscriptions/{subscription_exposed_id}',
  method: 'delete',
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

export type DeleteSubscriptionsSubscriptionExposedIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      cancellation_details?: {
        comment?: string | '';
        feedback?:
          | ''
          | 'customer_service'
          | 'low_quality'
          | 'missing_features'
          | 'other'
          | 'switched_service'
          | 'too_complex'
          | 'too_expensive'
          | 'unused';
      };
      expand?: string[];
      invoice_now?: boolean;
      prorate?: boolean;
    }
  >,
  {
    subscription_exposed_id: string;
  }
>;

export type DeleteSubscriptionsSubscriptionExposedIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Subscription>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteSubscriptionsSubscriptionExposedIdRequestResult =
  RequestResult<
    DeleteSubscriptionsSubscriptionExposedIdRequest,
    DeleteSubscriptionsSubscriptionExposedIdResponse
  >;

export function deleteSubscriptionsSubscriptionExposedId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteSubscriptionsSubscriptionExposedIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSubscriptionsSubscriptionExposedIdRequestResult> {
  return requestHandler.execute(
    createRequest(
      deleteSubscriptionsSubscriptionExposedIdEndpointSchema,
      payload
    ),
    config
  );
}
