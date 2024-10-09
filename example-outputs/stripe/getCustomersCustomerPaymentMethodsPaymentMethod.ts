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
import {Payment_method, Error} from '@example-outputs/stripe';

export const getCustomersCustomerPaymentMethodsPaymentMethodEndpointSchema = {
  path: '/v1/customers/{customer}/payment_methods/{payment_method}',
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

export type GetCustomersCustomerPaymentMethodsPaymentMethodRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      customer: string;
      payment_method: string;
    },
    {
      expand?: string[];
    }
  >;

export type GetCustomersCustomerPaymentMethodsPaymentMethodResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_method>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerPaymentMethodsPaymentMethodRequestResult =
  RequestResult<
    GetCustomersCustomerPaymentMethodsPaymentMethodRequest,
    GetCustomersCustomerPaymentMethodsPaymentMethodResponse
  >;

export function getCustomersCustomerPaymentMethodsPaymentMethod(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerPaymentMethodsPaymentMethodRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerPaymentMethodsPaymentMethodRequestResult> {
  return requestHandler.execute(
    createRequest(
      getCustomersCustomerPaymentMethodsPaymentMethodEndpointSchema,
      payload
    ),
    config
  );
}
