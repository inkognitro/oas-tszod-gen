import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1SimpleEarnLockedPositionEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/position',
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

export type GetSapiV1SimpleEarnLockedPositionPayload = {
  queryParams: {
    asset?: string;
    positionId?: string;
    projectId?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnLockedPositionResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              positionId: string;
              projectId: string;
              asset: string;
              amount: string;
              purchaseTime: string;
              duration: string;
              accrualDays: string;
              rewardAsset: string;
              APY: string;
              isRenewable: boolean;
              isAutoRenew: boolean;
              redeemDate: string;
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1SimpleEarnLockedPositionRequestResult = RequestResult<
  Request,
  GetSapiV1SimpleEarnLockedPositionResponse
>;

export function getSapiV1SimpleEarnLockedPosition(
  requestHandler: RequestHandler,
  payload: GetSapiV1SimpleEarnLockedPositionPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedPositionRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SimpleEarnLockedPositionEndpointSchema,
    }),
    config
  );
}
