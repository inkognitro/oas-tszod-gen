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

export const postPaymentIntentsIntentVerifyMicrodepositsEndpointSchema = {
  path: '/v1/payment_intents/{intent}/verify_microdeposits',
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

export type PostPaymentIntentsIntentVerifyMicrodepositsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amounts?: number[]; // item: int
      client_secret?: string;
      descriptor_code?: string;
      expand?: string[];
    }
  >,
  {
    intent: string;
  }
>;

export type PostPaymentIntentsIntentVerifyMicrodepositsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentIntentsIntentVerifyMicrodepositsRequestResult =
  RequestResult<
    PostPaymentIntentsIntentVerifyMicrodepositsRequest,
    PostPaymentIntentsIntentVerifyMicrodepositsResponse
  >;

export function postPaymentIntentsIntentVerifyMicrodeposits(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentIntentsIntentVerifyMicrodepositsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentIntentsIntentVerifyMicrodepositsRequestResult> {
  return requestHandler.execute(
    createRequest(
      postPaymentIntentsIntentVerifyMicrodepositsEndpointSchema,
      payload
    ),
    config
  );
}
