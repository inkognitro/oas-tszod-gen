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

export const postSetupIntentsIntentVerifyMicrodepositsEndpointSchema = {
  path: '/v1/setup_intents/{intent}/verify_microdeposits',
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

export type PostSetupIntentsIntentVerifyMicrodepositsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amounts?: number[]; // item: int
      client_secret?: string;
      descriptor_code?: string;
      expand?: string[];
    }
  >,
  {
    intent: string;
  }
>;

export type PostSetupIntentsIntentVerifyMicrodepositsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Setup_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSetupIntentsIntentVerifyMicrodepositsRequestResult =
  RequestResult<
    PostSetupIntentsIntentVerifyMicrodepositsRequest,
    PostSetupIntentsIntentVerifyMicrodepositsResponse
  >;

export function postSetupIntentsIntentVerifyMicrodeposits(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSetupIntentsIntentVerifyMicrodepositsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSetupIntentsIntentVerifyMicrodepositsRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSetupIntentsIntentVerifyMicrodepositsEndpointSchema,
      payload
    ),
    config
  );
}
