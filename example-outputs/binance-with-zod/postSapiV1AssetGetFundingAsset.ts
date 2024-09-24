import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1AssetGetFundingAssetEndpointSchema = {
  path: '/sapi/v1/asset/get-funding-asset',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    needBtcValuation: z
      .union([z.literal('true'), z.literal('false')])
      .optional(),
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
              asset: z.string(),
              free: z.string(),
              locked: z.string(),
              freeze: z.string(),
              withdrawing: z.string(),
              btcValuation: z.string(),
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

export type PostSapiV1AssetGetFundingAssetPayload = {
  queryParams: {
    asset?: string;
    needBtcValuation?: 'true' | 'false';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AssetGetFundingAssetResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            asset: string;
            free: string;
            locked: string;
            freeze: string;
            withdrawing: string;
            btcValuation: string;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1AssetGetFundingAssetRequestResult = RequestResult<
  Request,
  PostSapiV1AssetGetFundingAssetResponse
>;

export function postSapiV1AssetGetFundingAsset(
  requestHandler: RequestHandler,
  payload: PostSapiV1AssetGetFundingAssetPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetGetFundingAssetRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AssetGetFundingAssetEndpointSchema,
    }),
    config
  );
}
