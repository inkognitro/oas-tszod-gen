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

export const postCheckoutSessionsSessionExpireEndpointSchema = {
  path: '/v1/checkout/sessions/{session}/expire',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    session: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
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

export type PostCheckoutSessionsSessionExpireRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    session: string;
  }
>;

export type PostCheckoutSessionsSessionExpireResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Checkout_Session>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCheckoutSessionsSessionExpireRequestResult = RequestResult<
  PostCheckoutSessionsSessionExpireRequest,
  PostCheckoutSessionsSessionExpireResponse
>;

export function postCheckoutSessionsSessionExpire(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCheckoutSessionsSessionExpireRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCheckoutSessionsSessionExpireRequestResult> {
  return requestHandler.execute(
    createRequest(postCheckoutSessionsSessionExpireEndpointSchema, payload),
    config
  );
}
