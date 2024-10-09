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

export const getPaymentMethodsPaymentMethodEndpointSchema = {
  path: '/v1/payment_methods/{payment_method}',
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
