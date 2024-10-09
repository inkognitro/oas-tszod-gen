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

export const getLinkAccountSessionsSessionEndpointSchema = {
  path: '/v1/link_account_sessions/{session}',
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
