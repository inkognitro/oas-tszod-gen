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

export const getSapiV1SimpleEarnFlexibleSubscriptionpreviewEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/subscriptionPreview',
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

export type GetSapiV1SimpleEarnFlexibleSubscriptionpreviewPayload = {
  queryParams: {
    productId: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnFlexibleSubscriptionpreviewResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalAmount: string;
          rewardAsset: string;
          airDropAsset: string;
          estDailyBonusRewards: string;
          estDailyRealTimeRewards: string;
          estDailyAirdropRewards: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequestResult =
  RequestResult<
    Request,
    GetSapiV1SimpleEarnFlexibleSubscriptionpreviewResponse
  >;

export function getSapiV1SimpleEarnFlexibleSubscriptionpreview(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SimpleEarnFlexibleSubscriptionpreviewPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1SimpleEarnFlexibleSubscriptionpreviewEndpointSchema,
    }),
    config
  );
}
