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

export const getSapiV1LendingAutoInvestTargetAssetRoiListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/target-asset/roi/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type GetSapiV1LendingAutoInvestTargetAssetRoiListRequest = RequestUnion<
  any,
  any,
  {
    targetAsset: string;
    hisRoiType: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LendingAutoInvestTargetAssetRoiListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          date: string;
          simulateRoi: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestTargetAssetRoiListRequestResult =
  RequestResult<
    GetSapiV1LendingAutoInvestTargetAssetRoiListRequest,
    GetSapiV1LendingAutoInvestTargetAssetRoiListResponse
  >;

export function getSapiV1LendingAutoInvestTargetAssetRoiList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LendingAutoInvestTargetAssetRoiListRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestTargetAssetRoiListRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1LendingAutoInvestTargetAssetRoiListEndpointSchema,
      payload
    ),
    config
  );
}
