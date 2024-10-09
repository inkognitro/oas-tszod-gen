import {
  z_Payment_method,
  z_Error,
  Payment_method,
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

export const getCustomersCustomerPaymentMethodsPaymentMethodEndpointSchema = {
  path: '/v1/customers/{customer}/payment_methods/{payment_method}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    customer: z.string(),
    payment_method: z.string(),
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
          zodSchema: z_Payment_method,
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
