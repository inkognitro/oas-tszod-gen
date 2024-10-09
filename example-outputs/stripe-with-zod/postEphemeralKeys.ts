import {
  z_Ephemeral_key,
  z_Error,
  Ephemeral_key,
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

export const postEphemeralKeysEndpointSchema = {
  path: '/v1/ephemeral_keys',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        customer: z.string().optional(),
        expand: z.array(z.string()).optional(),
        issuing_card: z.string().optional(),
        nonce: z.string().optional(),
        verification_session: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Ephemeral_key,
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
