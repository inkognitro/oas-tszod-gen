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

export const postPaymentIntentsIntentIncrementAuthorizationEndpointSchema = {
  path: '/v1/payment_intents/{intent}/increment_authorization',
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

export type PostPaymentIntentsIntentIncrementAuthorizationRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        amount: number; // int
        application_fee_amount?: number; // int
        description?: string;
        expand?: string[];
        metadata?: {
          [key: string]: string;
        };
        statement_descriptor?: string;
        transfer_data?: {
          amount?: number; // int
        };
      }
    >,
    {
      intent: string;
    }
  >;

export type PostPaymentIntentsIntentIncrementAuthorizationResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentIntentsIntentIncrementAuthorizationRequestResult =
  RequestResult<
    PostPaymentIntentsIntentIncrementAuthorizationRequest,
    PostPaymentIntentsIntentIncrementAuthorizationResponse
  >;

export function postPaymentIntentsIntentIncrementAuthorization(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentIntentsIntentIncrementAuthorizationRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentIntentsIntentIncrementAuthorizationRequestResult> {
  return requestHandler.execute(
    createRequest(
      postPaymentIntentsIntentIncrementAuthorizationEndpointSchema,
      payload
    ),
    config
  );
}
