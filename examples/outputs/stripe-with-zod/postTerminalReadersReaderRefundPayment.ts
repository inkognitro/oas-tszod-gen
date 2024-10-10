import {z_Terminal_Reader, Terminal_Reader} from './terminal';
import {z_Error, Error} from './schemas';
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

export const postTerminalReadersReaderRefundPaymentEndpointSchema = {
  path: '/v1/terminal/readers/{reader}/refund_payment',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    reader: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        charge: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        payment_intent: z.string().optional(),
        refund_application_fee: z.boolean().optional(),
        refund_payment_config: z
          .object({
            enable_customer_cancellation: z.boolean().optional(),
          })
          .optional(),
        reverse_transfer: z.boolean().optional(),
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

export type PostTerminalReadersReaderRefundPaymentRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      charge?: string;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      payment_intent?: string;
      refund_application_fee?: boolean;
      refund_payment_config?: {
        enable_customer_cancellation?: boolean;
      };
      reverse_transfer?: boolean;
    }
  >,
  {
    reader: string;
  }
>;

export type PostTerminalReadersReaderRefundPaymentResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Terminal_Reader>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalReadersReaderRefundPaymentRequestResult = RequestResult<
  PostTerminalReadersReaderRefundPaymentRequest,
  PostTerminalReadersReaderRefundPaymentResponse
>;

export function postTerminalReadersReaderRefundPayment(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalReadersReaderRefundPaymentRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalReadersReaderRefundPaymentRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTerminalReadersReaderRefundPaymentEndpointSchema,
      payload
    ),
    config
  );
}
