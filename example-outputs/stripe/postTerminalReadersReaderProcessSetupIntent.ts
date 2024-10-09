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

export const postTerminalReadersReaderProcessSetupIntentEndpointSchema = {
  path: '/v1/terminal/readers/{reader}/process_setup_intent',
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

export type PostTerminalReadersReaderProcessSetupIntentRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      customer_consent_collected?: boolean;
      expand?: string[];
      process_config?: {
        enable_customer_cancellation?: boolean;
      };
      setup_intent: string;
    }
  >,
  {
    reader: string;
  }
>;

export type PostTerminalReadersReaderProcessSetupIntentResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Terminal_Reader>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalReadersReaderProcessSetupIntentRequestResult =
  RequestResult<
    PostTerminalReadersReaderProcessSetupIntentRequest,
    PostTerminalReadersReaderProcessSetupIntentResponse
  >;

export function postTerminalReadersReaderProcessSetupIntent(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalReadersReaderProcessSetupIntentRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalReadersReaderProcessSetupIntentRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTerminalReadersReaderProcessSetupIntentEndpointSchema,
      payload
    ),
    config
  );
}
