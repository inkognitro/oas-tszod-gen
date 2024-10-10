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
import {Deleted_terminal_Reader} from './deleted_terminal';
import {Error} from './schemas';

export const postTerminalReadersReaderEndpointSchema = {
  path: '/v1/terminal/readers/{reader}',
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
