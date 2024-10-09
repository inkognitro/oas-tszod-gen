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

export const postPaymentIntentsIntentCancelEndpointSchema = {
  path: '/v1/payment_intents/{intent}/cancel',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    intent: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        cancellation_reason: z
          .enum([
            'abandoned',
            'duplicate',
            'fraudulent',
            'requested_by_customer',
          ])
          .optional(),
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
