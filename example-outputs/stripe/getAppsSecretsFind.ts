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

export const getAppsSecretsFindEndpointSchema = {
  path: '/v1/apps/secrets/find',
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
