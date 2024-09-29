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

export const getSapiV1SimpleEarnLockedHistoryRedemptionrecordEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/history/redemptionRecord',
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

export type GetSapiV1SimpleEarnLockedHistoryRedemptionrecordPayload = {
  queryParams: {
    positionId?: string;
    redeemId?: string;
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnLockedHistoryRedemptionrecordResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            positionId: string;
            redeemId: number; // int
            time: number; // int
            asset: string;
            lockPeriod: string;
            amount: string;
            type: string;
            deliverDate: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnLockedHistoryRedemptionrecordRequestResult =
  RequestResult<
    Request,
    GetSapiV1SimpleEarnLockedHistoryRedemptionrecordResponse
  >;

export function getSapiV1SimpleEarnLockedHistoryRedemptionrecord(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SimpleEarnLockedHistoryRedemptionrecordPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedHistoryRedemptionrecordRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1SimpleEarnLockedHistoryRedemptionrecordEndpointSchema,
    }),
    config
  );
}
