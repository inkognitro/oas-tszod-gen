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
import {Apps_Secret, Error} from '@example-outputs/stripe';

export const postAppsSecretsEndpointSchema = {
  path: '/v1/apps/secrets',
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

export type PostAppsSecretsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      expires_at?: number; // int
      name: string;
      payload: string;
      scope: {
        type: 'account' | 'user';
        user?: string;
      };
    }
  >
>;

export type PostAppsSecretsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Apps_Secret>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAppsSecretsRequestResult = RequestResult<
  PostAppsSecretsRequest,
  PostAppsSecretsResponse
>;

export function postAppsSecrets(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAppsSecretsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAppsSecretsRequestResult> {
  return requestHandler.execute(
    createRequest(postAppsSecretsEndpointSchema, payload),
    config
  );
}
