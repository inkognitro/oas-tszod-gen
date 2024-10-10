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
import {Error} from './schemas';

export const postTerminalReadersReaderSetReaderDisplayEndpointSchema = {
  path: '/v1/terminal/readers/{reader}/set_reader_display',
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

export type PostTerminalReadersReaderSetReaderDisplayRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      cart?: {
        currency: string;
        line_items: {
          amount: number; // int
          description: string;
          quantity: number; // int
        }[];
        tax?: number; // int
        total: number; // int
      };
      expand?: string[];
      type: 'cart';
    }
  >,
  {
    reader: string;
  }
>;

export type PostTerminalReadersReaderSetReaderDisplayResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Terminal_Reader>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalReadersReaderSetReaderDisplayRequestResult =
  RequestResult<
    PostTerminalReadersReaderSetReaderDisplayRequest,
    PostTerminalReadersReaderSetReaderDisplayResponse
  >;

export function postTerminalReadersReaderSetReaderDisplay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalReadersReaderSetReaderDisplayRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalReadersReaderSetReaderDisplayRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTerminalReadersReaderSetReaderDisplayEndpointSchema,
      payload
    ),
    config
  );
}
