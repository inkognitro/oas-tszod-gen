import {z_Deleted_discount, z_Error, Deleted_discount, Error} from './schemas';
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
} from './core';

export const deleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountEndpointSchema =
  {
    path: '/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount',
    method: 'delete',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      customer: z.string(),
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

export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      customer: string;
      subscription_exposed_id: string;
    }
  >;

export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountResponse =

    | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_discount>>
    | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountRequestResult =
  RequestResult<
    DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountRequest,
    DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountResponse
  >;

export function deleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountRequestResult> {
  return requestHandler.execute(
    createRequest(
      deleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountEndpointSchema,
      payload
    ),
    config
  );
}
