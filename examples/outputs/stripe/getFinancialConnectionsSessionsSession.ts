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

export const getFinancialConnectionsSessionsSessionEndpointSchema = {
  path: '/v1/financial_connections/sessions/{session}',
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

export type GetFinancialConnectionsSessionsSessionRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    session: string;
  },
  {
    expand?: string[];
  }
>;

export type GetFinancialConnectionsSessionsSessionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Financial_connections_Session>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetFinancialConnectionsSessionsSessionRequestResult = RequestResult<
  GetFinancialConnectionsSessionsSessionRequest,
  GetFinancialConnectionsSessionsSessionResponse
>;

export function getFinancialConnectionsSessionsSession(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetFinancialConnectionsSessionsSessionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetFinancialConnectionsSessionsSessionRequestResult> {
  return requestHandler.execute(
    createRequest(
      getFinancialConnectionsSessionsSessionEndpointSchema,
      payload
    ),
    config
  );
}
