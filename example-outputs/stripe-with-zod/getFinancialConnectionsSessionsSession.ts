import {
  z_Financial_connections_Session,
  z_Error,
  Financial_connections_Session,
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

export const getFinancialConnectionsSessionsSessionEndpointSchema = {
  path: '/v1/financial_connections/sessions/{session}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    session: z.string(),
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
          zodSchema: z_Financial_connections_Session,
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
