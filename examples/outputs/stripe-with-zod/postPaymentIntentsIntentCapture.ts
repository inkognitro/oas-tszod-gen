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

export const postPaymentIntentsIntentCaptureEndpointSchema = {
  path: '/v1/payment_intents/{intent}/capture',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    intent: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount_to_capture: z.number().int().safe().finite().optional(),
        application_fee_amount: z.number().int().safe().finite().optional(),
        expand: z.array(z.string()).optional(),
        final_capture: z.boolean().optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        statement_descriptor: z.string().optional(),
        statement_descriptor_suffix: z.string().optional(),
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
