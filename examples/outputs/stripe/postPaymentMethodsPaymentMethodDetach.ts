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
import {Payment_method, Error} from './schemas';

export const postPaymentMethodsPaymentMethodDetachEndpointSchema = {
  path: '/v1/payment_methods/{payment_method}/detach',
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

export type PostPaymentMethodsPaymentMethodDetachRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    payment_method: string;
  }
>;

export type PostPaymentMethodsPaymentMethodDetachResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_method>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentMethodsPaymentMethodDetachRequestResult = RequestResult<
  PostPaymentMethodsPaymentMethodDetachRequest,
  PostPaymentMethodsPaymentMethodDetachResponse
>;

export function postPaymentMethodsPaymentMethodDetach(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentMethodsPaymentMethodDetachRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentMethodsPaymentMethodDetachRequestResult> {
  return requestHandler.execute(
    createRequest(postPaymentMethodsPaymentMethodDetachEndpointSchema, payload),
    config
  );
}
