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

export type GetSapiV1SimpleEarnLockedHistoryRewardsrecordRequest = RequestUnion<
  any,
  any,
  {
    positionId?: string;
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

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
  RequestResult<
    GetSapiV1SimpleEarnLockedHistoryRewardsrecordRequest,
    GetSapiV1SimpleEarnLockedHistoryRewardsrecordResponse
  >;

export function getSapiV1SimpleEarnLockedHistoryRewardsrecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnLockedHistoryRewardsrecordRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedHistoryRewardsrecordRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnLockedHistoryRewardsrecordEndpointSchema,
      payload
    ),
    config
  );
}
