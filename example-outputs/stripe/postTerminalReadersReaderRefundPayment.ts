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
import {Terminal_Reader, Error} from '@example-outputs/stripe';

export const postTerminalReadersReaderRefundPaymentEndpointSchema = {
  path: '/v1/terminal/readers/{reader}/refund_payment',
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
