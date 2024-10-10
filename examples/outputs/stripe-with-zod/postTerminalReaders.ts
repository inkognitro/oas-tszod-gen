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

export const postTerminalReadersEndpointSchema = {
  path: '/v1/terminal/readers',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        label: z.string().optional(),
        location: z.string().optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        registration_code: z.string(),
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

export type PostTerminalReadersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      label?: string;
      location?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      registration_code: string;
    }
  >
>;

export type PostTerminalReadersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Terminal_Reader>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalReadersRequestResult = RequestResult<
  PostTerminalReadersRequest,
  PostTerminalReadersResponse
>;

export function postTerminalReaders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalReadersRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalReadersRequestResult> {
  return requestHandler.execute(
    createRequest(postTerminalReadersEndpointSchema, payload),
    config
  );
}
