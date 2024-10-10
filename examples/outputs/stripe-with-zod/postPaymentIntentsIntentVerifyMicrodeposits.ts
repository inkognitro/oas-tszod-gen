import {z_Payment_intent, z_Error, Payment_intent, Error} from './schemas';
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
} from './core';

export const postPaymentIntentsIntentVerifyMicrodepositsEndpointSchema = {
  path: '/v1/payment_intents/{intent}/verify_microdeposits',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    intent: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amounts: z.array(z.number().int().safe().finite()).optional(),
        client_secret: z.string().optional(),
        descriptor_code: z.string().optional(),
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
