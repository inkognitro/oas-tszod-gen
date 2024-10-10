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
import {Financial_connections_Session} from './financial_connections';
import {Error} from './schemas';

export const getLinkAccountSessionsSessionEndpointSchema = {
  path: '/v1/link_account_sessions/{session}',
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

export type GetLinkAccountSessionsSessionRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    session: string;
  },
  {
    expand?: string[];
  }
>;

export type GetLinkAccountSessionsSessionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Financial_connections_Session>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetLinkAccountSessionsSessionRequestResult = RequestResult<
  GetLinkAccountSessionsSessionRequest,
  GetLinkAccountSessionsSessionResponse
>;

export function getLinkAccountSessionsSession(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetLinkAccountSessionsSessionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetLinkAccountSessionsSessionRequestResult> {
  return requestHandler.execute(
    createRequest(getLinkAccountSessionsSessionEndpointSchema, payload),
    config
  );
}
