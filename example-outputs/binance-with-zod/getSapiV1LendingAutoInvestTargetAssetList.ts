import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1LendingAutoInvestTargetAssetListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/target-asset/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    targetAsset: z.string().optional(),
    size: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
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
            targetAssets: z.string().optional(),
            autoInvestAssetList: z
              .array(
                z.object({
                  targetAsset: z.string(),
                  roiAndDimensionTypeList: z.array(
                    z.object({
                      simulateRoi: z.string(),
                      dimensionValue: z.string(),
                      dimensionUnit: z.string(),
                    })
                  ),
                })
              )
              .optional(),
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

export type GetSapiV1LendingAutoInvestTargetAssetListPayload = {
  queryParams: {
    targetAsset?: string;
    size?: number; // int
    current?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestTargetAssetListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          targetAssets?: string;
          autoInvestAssetList?: {
            targetAsset: string;
            roiAndDimensionTypeList: {
              simulateRoi: string;
              dimensionValue: string;
              dimensionUnit: string;
            }[];
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestTargetAssetListRequestResult =
  RequestResult<Request, GetSapiV1LendingAutoInvestTargetAssetListResponse>;

export function getSapiV1LendingAutoInvestTargetAssetList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestTargetAssetListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestTargetAssetListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestTargetAssetListEndpointSchema,
    }),
    config
  );
}
