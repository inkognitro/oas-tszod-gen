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

export const getTerminalReadersReaderEndpointSchema = {
  path: '/v1/terminal/readers/{reader}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    reader: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
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

export type GetTerminalReadersReaderRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    reader: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTerminalReadersReaderResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (Terminal_Reader | Deleted_terminal_Reader) &
          (Partial<Terminal_Reader> & Partial<Deleted_terminal_Reader>)
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTerminalReadersReaderRequestResult = RequestResult<
  GetTerminalReadersReaderRequest,
  GetTerminalReadersReaderResponse
>;

export function getTerminalReadersReader(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTerminalReadersReaderRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTerminalReadersReaderRequestResult> {
  return requestHandler.execute(
    createRequest(getTerminalReadersReaderEndpointSchema, payload),
    config
  );
}
