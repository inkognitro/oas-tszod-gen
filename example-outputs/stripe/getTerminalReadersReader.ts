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
import {
  Terminal_Reader,
  Deleted_terminal_Reader,
  Error,
} from '@example-outputs/stripe';

export const getTerminalReadersReaderEndpointSchema = {
  path: '/v1/terminal/readers/{reader}',
  method: 'get',
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
