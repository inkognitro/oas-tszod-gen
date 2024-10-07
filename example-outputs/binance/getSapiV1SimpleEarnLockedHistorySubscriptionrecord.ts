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

export const getSapiV1SimpleEarnLockedHistorySubscriptionrecordEndpointSchema =
  {
    path: '/sapi/v1/simple-earn/locked/history/subscriptionRecord',
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

export type GetSapiV1SimpleEarnLockedHistorySubscriptionrecordRequest =
  RequestUnion<
    any,
    any,
    {
      purchaseId?: string;
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

export type GetSapiV1SimpleEarnLockedHistorySubscriptionrecordResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnLockedHistorySubscriptionrecordRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnLockedHistorySubscriptionrecordRequest,
    GetSapiV1SimpleEarnLockedHistorySubscriptionrecordResponse
  >;

export function getSapiV1SimpleEarnLockedHistorySubscriptionrecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnLockedHistorySubscriptionrecordRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedHistorySubscriptionrecordRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnLockedHistorySubscriptionrecordEndpointSchema,
      payload
    ),
    config
  );
}
