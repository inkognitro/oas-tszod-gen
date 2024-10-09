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

export const postPaymentMethodsPaymentMethodAttachEndpointSchema = {
  path: '/v1/payment_methods/{payment_method}/attach',
  method: 'post',
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

export type PostPaymentMethodsPaymentMethodAttachRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      customer: string;
      expand?: string[];
    }
  >,
  {
    payment_method: string;
  }
>;

export type PostPaymentMethodsPaymentMethodAttachResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_method>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentMethodsPaymentMethodAttachRequestResult = RequestResult<
  PostPaymentMethodsPaymentMethodAttachRequest,
  PostPaymentMethodsPaymentMethodAttachResponse
>;

export function postPaymentMethodsPaymentMethodAttach(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentMethodsPaymentMethodAttachRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentMethodsPaymentMethodAttachRequestResult> {
  return requestHandler.execute(
    createRequest(postPaymentMethodsPaymentMethodAttachEndpointSchema, payload),
    config
  );
}
