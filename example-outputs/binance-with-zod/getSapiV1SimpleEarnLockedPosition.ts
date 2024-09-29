import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1SimpleEarnLockedPositionEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/position',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnLockedPositionRequestResult = RequestResult<
  Request,
  GetSapiV1SimpleEarnLockedPositionResponse
>;

export function getSapiV1SimpleEarnLockedPosition(
  requestHandler: SimpleRequestHandler,
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
