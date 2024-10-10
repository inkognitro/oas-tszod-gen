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
import {Checkout_Session} from './checkout';
import {Error} from './schemas';

export const postCheckoutSessionsSessionExpireEndpointSchema = {
  path: '/v1/checkout/sessions/{session}/expire',
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
