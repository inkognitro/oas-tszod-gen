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

export const getSapiV1SimpleEarnLockedHistoryRedemptionrecordEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/history/redemptionRecord',
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

export type GetSapiV1SimpleEarnLockedHistoryRedemptionrecordRequest =
  RequestUnion<
    any,
    any,
    {
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
    }
  >;

export type GetSapiV1SimpleEarnLockedHistoryRedemptionrecordResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnLockedHistoryRedemptionrecordRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnLockedHistoryRedemptionrecordRequest,
    GetSapiV1SimpleEarnLockedHistoryRedemptionrecordResponse
  >;

export function getSapiV1SimpleEarnLockedHistoryRedemptionrecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnLockedHistoryRedemptionrecordRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedHistoryRedemptionrecordRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnLockedHistoryRedemptionrecordEndpointSchema,
      payload
    ),
    config
  );
}
