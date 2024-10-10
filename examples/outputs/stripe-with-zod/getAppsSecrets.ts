import {z_Apps_Secret, Apps_Secret} from './apps';
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

export const getAppsSecretsEndpointSchema = {
  path: '/v1/apps/secrets',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    scope: z.object({
      type: z.enum(['account', 'user']),
      user: z.string().optional(),
    }),
    starting_after: z.string().optional(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            data: z.array(z_Apps_Secret),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/apps\/secrets/),
          }),
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

export type GetAppsSecretsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    scope: {
      type: 'account' | 'user';
      user?: string;
    };
    starting_after?: string;
  }
>;

export type GetAppsSecretsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Apps_Secret[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAppsSecretsRequestResult = RequestResult<
  GetAppsSecretsRequest,
  GetAppsSecretsResponse
>;

export function getAppsSecrets(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAppsSecretsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAppsSecretsRequestResult> {
  return requestHandler.execute(
    createRequest(getAppsSecretsEndpointSchema, payload),
    config
  );
}
