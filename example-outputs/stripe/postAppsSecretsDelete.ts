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

export const postAppsSecretsDeleteEndpointSchema = {
  path: '/v1/apps/secrets/delete',
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

export type PostAppsSecretsDeleteRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      name: string;
      scope: {
        type: 'account' | 'user';
        user?: string;
      };
    }
  >
>;

export type PostAppsSecretsDeleteResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Apps_Secret>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAppsSecretsDeleteRequestResult = RequestResult<
  PostAppsSecretsDeleteRequest,
  PostAppsSecretsDeleteResponse
>;

export function postAppsSecretsDelete(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAppsSecretsDeleteRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAppsSecretsDeleteRequestResult> {
  return requestHandler.execute(
    createRequest(postAppsSecretsDeleteEndpointSchema, payload),
    config
  );
}
