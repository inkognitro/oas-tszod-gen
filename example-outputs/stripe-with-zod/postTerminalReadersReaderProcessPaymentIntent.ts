import {
  z_Terminal_Reader,
  z_Error,
  Terminal_Reader,
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

export const postTerminalReadersReaderProcessPaymentIntentEndpointSchema = {
  path: '/v1/terminal/readers/{reader}/process_payment_intent',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    reader: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        payment_intent: z.string(),
        process_config: z
          .object({
            enable_customer_cancellation: z.boolean().optional(),
            skip_tipping: z.boolean().optional(),
            tipping: z
              .object({
                amount_eligible: z.number().int().safe().finite().optional(),
              })
              .optional(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Terminal_Reader,
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

export type PostTerminalReadersReaderProcessPaymentIntentRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      payment_intent: string;
      process_config?: {
        enable_customer_cancellation?: boolean;
        skip_tipping?: boolean;
        tipping?: {
          amount_eligible?: number; // int
        };
      };
    }
  >,
  {
    reader: string;
  }
>;

export type PostTerminalReadersReaderProcessPaymentIntentResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Terminal_Reader>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalReadersReaderProcessPaymentIntentRequestResult =
  RequestResult<
    PostTerminalReadersReaderProcessPaymentIntentRequest,
    PostTerminalReadersReaderProcessPaymentIntentResponse
  >;

export function postTerminalReadersReaderProcessPaymentIntent(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalReadersReaderProcessPaymentIntentRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalReadersReaderProcessPaymentIntentRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTerminalReadersReaderProcessPaymentIntentEndpointSchema,
      payload
    ),
    config
  );
}
