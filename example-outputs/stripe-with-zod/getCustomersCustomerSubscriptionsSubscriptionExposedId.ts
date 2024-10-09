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

export const getCustomersCustomerSubscriptionsSubscriptionExposedIdEndpointSchema =
  {
    path: '/v1/customers/{customer}/subscriptions/{subscription_exposed_id}',
    method: 'get',
    supportedSecuritySchemas: [],
    queryParamsZodSchema: z.object({
      expand: z.array(z.string()).optional(),
    }),
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

export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      customer: string;
      subscription_exposed_id: string;
    },
    {
      expand?: string[];
    }
  >;

export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Subscription>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdRequestResult =
  RequestResult<
    GetCustomersCustomerSubscriptionsSubscriptionExposedIdRequest,
    GetCustomersCustomerSubscriptionsSubscriptionExposedIdResponse
  >;

export function getCustomersCustomerSubscriptionsSubscriptionExposedId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerSubscriptionsSubscriptionExposedIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerSubscriptionsSubscriptionExposedIdRequestResult> {
  return requestHandler.execute(
    createRequest(
      getCustomersCustomerSubscriptionsSubscriptionExposedIdEndpointSchema,
      payload
    ),
    config
  );
}
