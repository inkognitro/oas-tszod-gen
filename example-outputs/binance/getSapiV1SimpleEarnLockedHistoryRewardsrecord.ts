import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1SimpleEarnLockedHistoryRewardsrecordEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/history/rewardsRecord',
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

export type GetSapiV1SimpleEarnLockedHistoryRewardsrecordPayload = {
  queryParams: {
    positionId?: string;
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnLockedHistoryRewardsrecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            positionId: string;
            time: number; // int
            asset: string;
            lockPeriod: string;
            amount: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnLockedHistoryRewardsrecordRequestResult =
  RequestResult<Request, GetSapiV1SimpleEarnLockedHistoryRewardsrecordResponse>;

export function getSapiV1SimpleEarnLockedHistoryRewardsrecord(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SimpleEarnLockedHistoryRewardsrecordPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedHistoryRewardsrecordRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1SimpleEarnLockedHistoryRewardsrecordEndpointSchema,
    }),
    config
  );
}
