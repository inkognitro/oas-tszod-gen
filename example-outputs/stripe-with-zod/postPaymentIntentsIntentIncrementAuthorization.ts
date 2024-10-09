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

export const postPaymentIntentsIntentIncrementAuthorizationEndpointSchema = {
  path: '/v1/payment_intents/{intent}/increment_authorization',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    intent: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite(),
        application_fee_amount: z.number().int().safe().finite().optional(),
        description: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        statement_descriptor: z.string().optional(),
        transfer_data: z
          .object({
            amount: z.number().int().safe().finite().optional(),
          })
          .optional(),
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
