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

export const getPaymentMethodsPaymentMethodEndpointSchema = {
  path: '/v1/payment_methods/{payment_method}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
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

export type GetPaymentMethodsPaymentMethodRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    payment_method: string;
  },
  {
    expand?: string[];
  }
>;

export type GetPaymentMethodsPaymentMethodResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_method>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentMethodsPaymentMethodRequestResult = RequestResult<
  GetPaymentMethodsPaymentMethodRequest,
  GetPaymentMethodsPaymentMethodResponse
>;

export function getPaymentMethodsPaymentMethod(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentMethodsPaymentMethodRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentMethodsPaymentMethodRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentMethodsPaymentMethodEndpointSchema, payload),
    config
  );
}
