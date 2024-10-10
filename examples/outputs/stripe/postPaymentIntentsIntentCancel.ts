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
import {Payment_intent, Error} from './schemas';

export const postPaymentIntentsIntentCancelEndpointSchema = {
  path: '/v1/payment_intents/{intent}/cancel',
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

export type PostPaymentIntentsIntentCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      cancellation_reason?:
        | 'abandoned'
        | 'duplicate'
        | 'fraudulent'
        | 'requested_by_customer';
      expand?: string[];
    }
  >,
  {
    intent: string;
  }
>;

export type PostPaymentIntentsIntentCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentIntentsIntentCancelRequestResult = RequestResult<
  PostPaymentIntentsIntentCancelRequest,
  PostPaymentIntentsIntentCancelResponse
>;

export function postPaymentIntentsIntentCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentIntentsIntentCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentIntentsIntentCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postPaymentIntentsIntentCancelEndpointSchema, payload),
    config
  );
}
