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
import {Terminal_Reader, Error} from '@example-outputs/stripe';

export const postTerminalReadersReaderCancelActionEndpointSchema = {
  path: '/v1/terminal/readers/{reader}/cancel_action',
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
