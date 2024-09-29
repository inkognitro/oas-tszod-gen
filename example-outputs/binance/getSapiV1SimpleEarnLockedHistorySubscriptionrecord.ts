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

export const getSapiV1SimpleEarnLockedHistorySubscriptionrecordEndpointSchema =
  {
    path: '/sapi/v1/simple-earn/locked/history/subscriptionRecord',
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

export type GetSapiV1SimpleEarnLockedHistorySubscriptionrecordPayload = {
  queryParams: {
    purchaseId?: string;
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

export type GetSapiV1SimpleEarnLockedHistorySubscriptionrecordResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            positionId: string;
            purchaseId: number; // int
            time: number; // int
            asset: string;
            amount: string;
            lockPeriod: string;
            type: string;
            sourceAccount: string;
            amtFromSpot: string;
            amtFromFunding: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnLockedHistorySubscriptionrecordRequestResult =
  RequestResult<
    Request,
    GetSapiV1SimpleEarnLockedHistorySubscriptionrecordResponse
  >;

export function getSapiV1SimpleEarnLockedHistorySubscriptionrecord(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SimpleEarnLockedHistorySubscriptionrecordPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedHistorySubscriptionrecordRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1SimpleEarnLockedHistorySubscriptionrecordEndpointSchema,
    }),
    config
  );
}
