import {
  z_Terminal_Connection_token,
  Terminal_Connection_token,
} from './terminal';
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

export const postTerminalConnectionTokensEndpointSchema = {
  path: '/v1/terminal/connection_tokens',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        location: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Terminal_Connection_token,
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
