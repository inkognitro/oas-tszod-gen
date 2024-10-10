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

export const postTerminalReadersReaderProcessSetupIntentEndpointSchema = {
  path: '/v1/terminal/readers/{reader}/process_setup_intent',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    reader: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        customer_consent_collected: z.boolean().optional(),
        expand: z.array(z.string()).optional(),
        process_config: z
          .object({
            enable_customer_cancellation: z.boolean().optional(),
          })
          .optional(),
        setup_intent: z.string(),
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
