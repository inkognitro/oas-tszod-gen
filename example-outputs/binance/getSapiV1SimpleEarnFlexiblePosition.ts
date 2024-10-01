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

export const getSapiV1SimpleEarnFlexiblePositionEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/position',
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

export type GetSapiV1SimpleEarnFlexiblePositionPayload = {
  queryParams: {
    asset?: string;
    productId?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnFlexiblePositionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            totalAmount: string;
            tierAnnualPercentageRate: {
              '0-5BTC': number;
              '5-10BTC': number;
            };
            latestAnnualPercentageRate: string;
            yesterdayAirdropPercentageRate: string;
            asset: string;
            airDropAsset: string;
            canRedeem: boolean;
            collateralAmount: string;
            productId: string;
            yesterdayRealTimeRewards: string;
            cumulativeBonusRewards: string;
            cumulativeRealTimeRewards: string;
            cumulativeTotalRewards: string;
            autoSubscribe: boolean;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexiblePositionRequestResult = RequestResult<
  Request,
  GetSapiV1SimpleEarnFlexiblePositionResponse
>;

export function getSapiV1SimpleEarnFlexiblePosition(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SimpleEarnFlexiblePositionPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexiblePositionRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SimpleEarnFlexiblePositionEndpointSchema,
    }),
    config
  );
}
