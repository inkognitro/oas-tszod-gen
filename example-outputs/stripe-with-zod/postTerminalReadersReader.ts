import {
  z_Terminal_Reader,
  z_Deleted_terminal_Reader,
  z_Error,
  Terminal_Reader,
  Deleted_terminal_Reader,
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

export const postTerminalReadersReaderEndpointSchema = {
  path: '/v1/terminal/readers/{reader}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    reader: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        label: z.union([z.string(), z.enum([''])]).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([z_Terminal_Reader, z_Deleted_terminal_Reader]),
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

export type PostTerminalReadersReaderRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      label?: string | '';
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    reader: string;
  }
>;

export type PostTerminalReadersReaderResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (Terminal_Reader | Deleted_terminal_Reader) &
          (Partial<Terminal_Reader> & Partial<Deleted_terminal_Reader>)
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalReadersReaderRequestResult = RequestResult<
  PostTerminalReadersReaderRequest,
  PostTerminalReadersReaderResponse
>;

export function postTerminalReadersReader(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalReadersReaderRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalReadersReaderRequestResult> {
  return requestHandler.execute(
    createRequest(postTerminalReadersReaderEndpointSchema, payload),
    config
  );
}
