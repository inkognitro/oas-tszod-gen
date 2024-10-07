import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSapiV1SimpleEarnLockedPersonalleftquotaEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/personalLeftQuota',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type GetSapiV1SimpleEarnLockedPersonalleftquotaRequest = RequestUnion<
  any,
  any,
  {
    projectId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SimpleEarnLockedPersonalleftquotaResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          leftPersonalQuota: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnLockedPersonalleftquotaRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnLockedPersonalleftquotaRequest,
    GetSapiV1SimpleEarnLockedPersonalleftquotaResponse
  >;

export function getSapiV1SimpleEarnLockedPersonalleftquota(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnLockedPersonalleftquotaRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedPersonalleftquotaRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnLockedPersonalleftquotaEndpointSchema,
      payload
    ),
    config
  );
}
