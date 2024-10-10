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

export const postCheckoutSessionsSessionEndpointSchema = {
  path: '/v1/checkout/sessions/{session}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    session: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
      }),
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

export type PostCheckoutSessionsSessionRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    session: string;
  }
>;

export type PostCheckoutSessionsSessionResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Checkout_Session>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCheckoutSessionsSessionRequestResult = RequestResult<
  PostCheckoutSessionsSessionRequest,
  PostCheckoutSessionsSessionResponse
>;

export function postCheckoutSessionsSession(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCheckoutSessionsSessionRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCheckoutSessionsSessionRequestResult> {
  return requestHandler.execute(
    createRequest(postCheckoutSessionsSessionEndpointSchema, payload),
    config
  );
}
