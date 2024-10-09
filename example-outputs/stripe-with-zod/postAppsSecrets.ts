import {
  z_Apps_Secret,
  z_Error,
  Apps_Secret,
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

export const postAppsSecretsEndpointSchema = {
  path: '/v1/apps/secrets',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        expires_at: z.number().int().safe().finite().optional(),
        name: z.string(),
        payload: z.string(),
        scope: z.object({
          type: z.enum(['account', 'user']),
          user: z.string().optional(),
        }),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Apps_Secret,
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
