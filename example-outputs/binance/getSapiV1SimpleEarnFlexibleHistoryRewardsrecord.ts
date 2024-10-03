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

export const getSapiV1SimpleEarnFlexibleHistoryRewardsrecordEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/history/rewardsRecord',
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

export type GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordRequest =
  RequestUnion<
    any,
    any,
    {
      productId?: string;
      asset?: string;
      startTime?: number; // int
      endTime?: number; // int
      type: string;
    }
  >;

export type GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            asset: string;
            rewards: string;
            projectId: string;
            type: string;
            time: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordRequest,
    GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordResponse
  >;

export function getSapiV1SimpleEarnFlexibleHistoryRewardsrecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnFlexibleHistoryRewardsrecordEndpointSchema,
      payload
    ),
    config
  );
}
