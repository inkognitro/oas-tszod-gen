import {
  z_Payment_intent,
  z_Error,
  Payment_intent,
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

export const postPaymentIntentsIntentApplyCustomerBalanceEndpointSchema = {
  path: '/v1/payment_intents/{intent}/apply_customer_balance',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    intent: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        currency: z.string().optional(),
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Payment_intent,
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
