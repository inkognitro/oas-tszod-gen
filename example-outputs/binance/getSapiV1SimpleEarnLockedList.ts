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

export const getSapiV1SimpleEarnLockedListEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/list',
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

export type GetSapiV1SimpleEarnLockedListRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SimpleEarnLockedListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            projectId: string;
            detail: {
              asset: string;
              rewardAsset: string;
              duration: number; // int
              renewable: boolean;
              isSoldOut: boolean;
              apr: string;
              status: string;
              subscriptionStartTime: string;
              extraRewardAsset: string;
              extraRewardAPR: string;
            };
            quota: {
              totalPersonalQuota: string;
              minimum: string;
            };
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnLockedListRequestResult = RequestResult<
  GetSapiV1SimpleEarnLockedListRequest,
  GetSapiV1SimpleEarnLockedListResponse
>;

export function getSapiV1SimpleEarnLockedList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1SimpleEarnLockedListRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1SimpleEarnLockedListEndpointSchema, payload),
    config
  );
}
