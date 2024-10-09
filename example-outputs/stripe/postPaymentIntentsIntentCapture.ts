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
import {Payment_intent, Error} from '@example-outputs/stripe';

export const postPaymentIntentsIntentCaptureEndpointSchema = {
  path: '/v1/payment_intents/{intent}/capture',
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

export type PostPaymentIntentsIntentCaptureRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount_to_capture?: number; // int
      application_fee_amount?: number; // int
      expand?: string[];
      final_capture?: boolean;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      statement_descriptor?: string;
      statement_descriptor_suffix?: string;
      transfer_data?: {
        amount?: number; // int
      };
    }
  >,
  {
    intent: string;
  }
>;

export type PostPaymentIntentsIntentCaptureResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentIntentsIntentCaptureRequestResult = RequestResult<
  PostPaymentIntentsIntentCaptureRequest,
  PostPaymentIntentsIntentCaptureResponse
>;

export function postPaymentIntentsIntentCapture(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentIntentsIntentCaptureRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentIntentsIntentCaptureRequestResult> {
  return requestHandler.execute(
    createRequest(postPaymentIntentsIntentCaptureEndpointSchema, payload),
    config
  );
}
