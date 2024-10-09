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

export const deleteCustomersCustomerSubscriptionsSubscriptionExposedIdEndpointSchema =
  {
    path: '/v1/customers/{customer}/subscriptions/{subscription_exposed_id}',
    method: 'delete',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      customer: z.string(),
      subscription_exposed_id: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          expand: z.array(z.string()).optional(),
          invoice_now: z.boolean().optional(),
          prorate: z.boolean().optional(),
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

export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
        invoice_now?: boolean;
        prorate?: boolean;
      }
    >,
    {
      customer: string;
      subscription_exposed_id: string;
    }
  >;

export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Subscription>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdRequestResult =
  RequestResult<
    DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdRequest,
    DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdResponse
  >;

export function deleteCustomersCustomerSubscriptionsSubscriptionExposedId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdRequestResult> {
  return requestHandler.execute(
    createRequest(
      deleteCustomersCustomerSubscriptionsSubscriptionExposedIdEndpointSchema,
      payload
    ),
    config
  );
}
