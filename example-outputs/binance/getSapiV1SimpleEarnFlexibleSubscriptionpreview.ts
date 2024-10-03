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

export type GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequest =
  RequestUnion<
    any,
    any,
    {
      productId: string;
      amount: number;
      recvWindow?: number; // int
      timestamp: number; // int
      signature: string;
    }
  >;

export type GetSapiV1SimpleEarnFlexibleSubscriptionpreviewResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequest,
    GetSapiV1SimpleEarnFlexibleSubscriptionpreviewResponse
  >;

export function getSapiV1SimpleEarnFlexibleSubscriptionpreview(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnFlexibleSubscriptionpreviewEndpointSchema,
      payload
    ),
    config
  );
}
