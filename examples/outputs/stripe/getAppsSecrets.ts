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
import {Apps_Secret} from './apps';
import {Error} from './schemas';

export const getAppsSecretsEndpointSchema = {
  path: '/v1/apps/secrets',
  method: 'get',
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
