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

export const postPaymentIntentsIntentApplyCustomerBalanceEndpointSchema = {
  path: '/v1/payment_intents/{intent}/apply_customer_balance',
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

export type PostPaymentIntentsIntentApplyCustomerBalanceRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      currency?: string;
      expand?: string[];
    }
  >,
  {
    intent: string;
  }
>;

export type PostPaymentIntentsIntentApplyCustomerBalanceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentIntentsIntentApplyCustomerBalanceRequestResult =
  RequestResult<
    PostPaymentIntentsIntentApplyCustomerBalanceRequest,
    PostPaymentIntentsIntentApplyCustomerBalanceResponse
  >;

export function postPaymentIntentsIntentApplyCustomerBalance(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentIntentsIntentApplyCustomerBalanceRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentIntentsIntentApplyCustomerBalanceRequestResult> {
  return requestHandler.execute(
    createRequest(
      postPaymentIntentsIntentApplyCustomerBalanceEndpointSchema,
      payload
    ),
    config
  );
}
