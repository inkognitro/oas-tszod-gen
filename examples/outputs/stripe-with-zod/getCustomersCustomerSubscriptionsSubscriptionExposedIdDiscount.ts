import {z_Discount, z_Error, Discount, Error} from './schemas';
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

export const getCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountEndpointSchema =
  {
    path: '/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount',
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
            zodSchema: z_Discount,
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

export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountRequest =
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

export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountResponse =

    | ResponseUnion<200, ResponseBodyData<'application/json', Discount>>
    | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountRequestResult =
  RequestResult<
    GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountRequest,
    GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountResponse
  >;

export function getCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountRequestResult> {
  return requestHandler.execute(
    createRequest(
      getCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountEndpointSchema,
      payload
    ),
    config
  );
}
