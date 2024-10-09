import {
  z_Deleted_discount,
  z_Error,
  Deleted_discount,
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

export const deleteSubscriptionsSubscriptionExposedIdDiscountEndpointSchema = {
  path: '/v1/subscriptions/{subscription_exposed_id}/discount',
  method: 'delete',
  supportedSecuritySchemas: [],
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
          zodSchema: z_Deleted_discount,
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
