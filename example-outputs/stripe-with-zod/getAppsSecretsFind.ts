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

export const getAppsSecretsFindEndpointSchema = {
  path: '/v1/apps/secrets/find',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
    name: z.string(),
    scope: z.object({
      type: z.enum(['account', 'user']),
      user: z.string().optional(),
    }),
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

export type GetAppsSecretsFindRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
    name: string;
    scope: {
      type: 'account' | 'user';
      user?: string;
    };
  }
>;

export type GetAppsSecretsFindResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Apps_Secret>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAppsSecretsFindRequestResult = RequestResult<
  GetAppsSecretsFindRequest,
  GetAppsSecretsFindResponse
>;

export function getAppsSecretsFind(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAppsSecretsFindRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAppsSecretsFindRequestResult> {
  return requestHandler.execute(
    createRequest(getAppsSecretsFindEndpointSchema, payload),
    config
  );
}
