import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1SimpleEarnLockedPersonalleftquotaEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/personalLeftQuota',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetSapiV1SimpleEarnLockedPersonalleftquotaPayload = {
  queryParams: {
    projectId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnLockedPersonalleftquotaResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          leftPersonalQuota: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnLockedPersonalleftquotaRequestResult =
  RequestResult<Request, GetSapiV1SimpleEarnLockedPersonalleftquotaResponse>;

export function getSapiV1SimpleEarnLockedPersonalleftquota(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SimpleEarnLockedPersonalleftquotaPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedPersonalleftquotaRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SimpleEarnLockedPersonalleftquotaEndpointSchema,
    }),
    config
  );
}
