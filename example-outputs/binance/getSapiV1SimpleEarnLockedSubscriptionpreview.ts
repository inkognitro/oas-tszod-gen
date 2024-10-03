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

export const getSapiV1SimpleEarnLockedSubscriptionpreviewEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/subscriptionPreview',
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

export type GetSapiV1SimpleEarnLockedSubscriptionpreviewRequest = RequestUnion<
  any,
  any,
  {
    projectId: string;
    amount: number;
    autoSubscribe?: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SimpleEarnLockedSubscriptionpreviewResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rewardAsset: string;
          totalRewardAmt: string;
          extraRewardAsset: string;
          estTotalExtraRewardAmt: string;
          nextPay: string;
          nextPayDate: string;
          valueDate: string;
          rewardsEndDate: string;
          deliverDate: string;
          nextSubscriptionDate: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnLockedSubscriptionpreviewRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnLockedSubscriptionpreviewRequest,
    GetSapiV1SimpleEarnLockedSubscriptionpreviewResponse
  >;

export function getSapiV1SimpleEarnLockedSubscriptionpreview(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnLockedSubscriptionpreviewRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedSubscriptionpreviewRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnLockedSubscriptionpreviewEndpointSchema,
      payload
    ),
    config
  );
}
