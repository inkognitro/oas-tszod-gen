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
import {Discount, Error} from './schemas';

export const getCustomersCustomerSubscriptionsSubscriptionExposedIdDiscountEndpointSchema =
  {
    path: '/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount',
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
