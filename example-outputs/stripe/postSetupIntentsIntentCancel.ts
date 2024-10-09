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
} from '@example-outputs/stripe/core';
import {Setup_intent, Error} from '@example-outputs/stripe';

export const postSetupIntentsIntentCancelEndpointSchema = {
  path: '/v1/setup_intents/{intent}/cancel',
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

export type PostSetupIntentsIntentCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      cancellation_reason?: 'abandoned' | 'duplicate' | 'requested_by_customer';
      expand?: string[];
    }
  >,
  {
    intent: string;
  }
>;

export type PostSetupIntentsIntentCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Setup_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSetupIntentsIntentCancelRequestResult = RequestResult<
  PostSetupIntentsIntentCancelRequest,
  PostSetupIntentsIntentCancelResponse
>;

export function postSetupIntentsIntentCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSetupIntentsIntentCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSetupIntentsIntentCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postSetupIntentsIntentCancelEndpointSchema, payload),
    config
  );
}
