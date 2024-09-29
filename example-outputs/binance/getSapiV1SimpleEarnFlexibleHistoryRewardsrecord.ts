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

export const getSapiV1SimpleEarnFlexibleHistoryRewardsrecordEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/history/rewardsRecord',
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

export type GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordPayload = {
  queryParams: {
    productId?: string;
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    type: string;
  };
};

export type GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordRequestResult =
  RequestResult<
    Request,
    GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordResponse
  >;

export function getSapiV1SimpleEarnFlexibleHistoryRewardsrecord(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1SimpleEarnFlexibleHistoryRewardsrecordEndpointSchema,
    }),
    config
  );
}
