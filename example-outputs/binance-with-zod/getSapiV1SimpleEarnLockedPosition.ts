import {z_Error, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1SimpleEarnLockedPositionEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/position',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    positionId: z.string().optional(),
    projectId: z.string().optional(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            rows: z.array(
              z.object({
                positionId: z.string(),
                projectId: z.string(),
                asset: z.string(),
                amount: z.string(),
                purchaseTime: z.string(),
                duration: z.string(),
                accrualDays: z.string(),
                rewardAsset: z.string(),
                APY: z.string(),
                isRenewable: z.boolean(),
                isAutoRenew: z.boolean(),
                redeemDate: z.string(),
              })
            ),
            total: z.number().int().safe().finite(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetSapiV1SimpleEarnLockedPositionRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    positionId?: string;
    projectId?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SimpleEarnLockedPositionResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnLockedPositionRequestResult = RequestResult<
  GetSapiV1SimpleEarnLockedPositionRequest,
  GetSapiV1SimpleEarnLockedPositionResponse
>;

export function getSapiV1SimpleEarnLockedPosition(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnLockedPositionRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnLockedPositionRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1SimpleEarnLockedPositionEndpointSchema, payload),
    config
  );
}
