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

export const getSapiV1LendingAutoInvestTargetAssetRoiListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/target-asset/roi/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    targetAsset: z.string(),
    hisRoiType: z.string(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              date: z.string(),
              simulateRoi: z.string(),
            })
          ),
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

export type GetSapiV1LendingAutoInvestTargetAssetRoiListPayload = {
  queryParams: {
    targetAsset: string;
    hisRoiType: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestTargetAssetRoiListResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          date: string;
          simulateRoi: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestTargetAssetRoiListRequestResult =
  RequestResult<Request, GetSapiV1LendingAutoInvestTargetAssetRoiListResponse>;

export function getSapiV1LendingAutoInvestTargetAssetRoiList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestTargetAssetRoiListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestTargetAssetRoiListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1LendingAutoInvestTargetAssetRoiListEndpointSchema,
    }),
    config
  );
}
