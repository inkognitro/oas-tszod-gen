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
import {Terminal_Connection_token} from './terminal';
import {Error} from './schemas';

export const postTerminalConnectionTokensEndpointSchema = {
  path: '/v1/terminal/connection_tokens',
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

export type PostTerminalConnectionTokensRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      location?: string;
    }
  >
>;

export type PostTerminalConnectionTokensResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Terminal_Connection_token>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalConnectionTokensRequestResult = RequestResult<
  PostTerminalConnectionTokensRequest,
  PostTerminalConnectionTokensResponse
>;

export function postTerminalConnectionTokens(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalConnectionTokensRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalConnectionTokensRequestResult> {
  return requestHandler.execute(
    createRequest(postTerminalConnectionTokensEndpointSchema, payload),
    config
  );
}
