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
import {Deleted_terminal_Reader, Error} from '@example-outputs/stripe';

export const deleteTerminalReadersReaderEndpointSchema = {
  path: '/v1/terminal/readers/{reader}',
  method: 'delete',
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
