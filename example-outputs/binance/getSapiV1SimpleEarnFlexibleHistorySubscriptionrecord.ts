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

export const getSapiV1SimpleEarnFlexibleHistorySubscriptionrecordEndpointSchema =
  {
    path: '/sapi/v1/simple-earn/flexible/history/subscriptionRecord',
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

export type GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordRequest =
  RequestUnion<
    any,
    any,
    {
      productId?: string;
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

export type GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            amount: string;
            asset: string;
            time: number; // int
            purchaseId: number; // int
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

export type GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordRequest,
    GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordResponse
  >;

export function getSapiV1SimpleEarnFlexibleHistorySubscriptionrecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnFlexibleHistorySubscriptionrecordEndpointSchema,
      payload
    ),
    config
  );
}
