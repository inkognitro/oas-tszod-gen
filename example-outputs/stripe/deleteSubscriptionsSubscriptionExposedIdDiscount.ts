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
import {Deleted_discount, Error} from '@example-outputs/stripe';

export const deleteSubscriptionsSubscriptionExposedIdDiscountEndpointSchema = {
  path: '/v1/subscriptions/{subscription_exposed_id}/discount',
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

export type DeleteSubscriptionsSubscriptionExposedIdDiscountRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      subscription_exposed_id: string;
    }
  >;

export type DeleteSubscriptionsSubscriptionExposedIdDiscountResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_discount>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteSubscriptionsSubscriptionExposedIdDiscountRequestResult =
  RequestResult<
    DeleteSubscriptionsSubscriptionExposedIdDiscountRequest,
    DeleteSubscriptionsSubscriptionExposedIdDiscountResponse
  >;

export function deleteSubscriptionsSubscriptionExposedIdDiscount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteSubscriptionsSubscriptionExposedIdDiscountRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSubscriptionsSubscriptionExposedIdDiscountRequestResult> {
  return requestHandler.execute(
    createRequest(
      deleteSubscriptionsSubscriptionExposedIdDiscountEndpointSchema,
      payload
    ),
    config
  );
}
