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
import {Terminal_Reader} from './terminal';
import {Error} from './schemas';

export const postTerminalReadersReaderProcessPaymentIntentEndpointSchema = {
  path: '/v1/terminal/readers/{reader}/process_payment_intent',
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
