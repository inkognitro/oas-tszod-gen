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
import {Ephemeral_key, Error} from '@example-outputs/stripe';

export const postEphemeralKeysEndpointSchema = {
  path: '/v1/ephemeral_keys',
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

export type PostEphemeralKeysRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      customer?: string;
      expand?: string[];
      issuing_card?: string;
      nonce?: string;
      verification_session?: string;
    }
  >
>;

export type PostEphemeralKeysResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Ephemeral_key>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostEphemeralKeysRequestResult = RequestResult<
  PostEphemeralKeysRequest,
  PostEphemeralKeysResponse
>;

export function postEphemeralKeys(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostEphemeralKeysRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostEphemeralKeysRequestResult> {
  return requestHandler.execute(
    createRequest(postEphemeralKeysEndpointSchema, payload),
    config
  );
}
