import {
  z_Deleted_terminal_Reader,
  z_Error,
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

export const deleteTerminalReadersReaderEndpointSchema = {
  path: '/v1/terminal/readers/{reader}',
  method: 'delete',
  supportedSecuritySchemas: [],
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
          zodSchema: z_Deleted_terminal_Reader,
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

export type DeleteTerminalReadersReaderRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    reader: string;
  }
>;

export type DeleteTerminalReadersReaderResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_terminal_Reader>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteTerminalReadersReaderRequestResult = RequestResult<
  DeleteTerminalReadersReaderRequest,
  DeleteTerminalReadersReaderResponse
>;

export function deleteTerminalReadersReader(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteTerminalReadersReaderRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteTerminalReadersReaderRequestResult> {
  return requestHandler.execute(
    createRequest(deleteTerminalReadersReaderEndpointSchema, payload),
    config
  );
}
