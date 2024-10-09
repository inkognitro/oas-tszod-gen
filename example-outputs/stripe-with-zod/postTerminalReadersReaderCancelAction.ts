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

export const postTerminalReadersReaderCancelActionEndpointSchema = {
  path: '/v1/terminal/readers/{reader}/cancel_action',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    reader: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
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

export type PostTerminalReadersReaderCancelActionRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    reader: string;
  }
>;

export type PostTerminalReadersReaderCancelActionResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Terminal_Reader>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalReadersReaderCancelActionRequestResult = RequestResult<
  PostTerminalReadersReaderCancelActionRequest,
  PostTerminalReadersReaderCancelActionResponse
>;

export function postTerminalReadersReaderCancelAction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalReadersReaderCancelActionRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalReadersReaderCancelActionRequestResult> {
  return requestHandler.execute(
    createRequest(postTerminalReadersReaderCancelActionEndpointSchema, payload),
    config
  );
}
