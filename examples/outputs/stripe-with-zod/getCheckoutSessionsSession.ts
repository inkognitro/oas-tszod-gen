import {z_Checkout_Session, Checkout_Session} from './checkout';
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

export const getCheckoutSessionsSessionEndpointSchema = {
  path: '/v1/checkout/sessions/{session}',
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
          zodSchema: z_Checkout_Session,
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

export type GetCheckoutSessionsSessionRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    session: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCheckoutSessionsSessionResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Checkout_Session>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCheckoutSessionsSessionRequestResult = RequestResult<
  GetCheckoutSessionsSessionRequest,
  GetCheckoutSessionsSessionResponse
>;

export function getCheckoutSessionsSession(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCheckoutSessionsSessionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCheckoutSessionsSessionRequestResult> {
  return requestHandler.execute(
    createRequest(getCheckoutSessionsSessionEndpointSchema, payload),
    config
  );
}
