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

export const getSapiV1AssetAssetdividendEndpointSchema = {
  path: '/sapi/v1/asset/assetDividend',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().lte(500).optional(),
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
                id: z.number().int().safe().finite(),
                amount: z.string(),
                asset: z.string(),
                divTime: z.number().int().safe().finite(),
                enInfo: z.string(),
                tranId: z.number().int().safe().finite(),
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

export type GetSapiV1AssetAssetdividendRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AssetAssetdividendResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            id: number; // int
            amount: string;
            asset: string;
            divTime: number; // int
            enInfo: string;
            tranId: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetAssetdividendRequestResult = RequestResult<
  GetSapiV1AssetAssetdividendRequest,
  GetSapiV1AssetAssetdividendResponse
>;

export function getSapiV1AssetAssetdividend(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1AssetAssetdividendRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetAssetdividendRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AssetAssetdividendEndpointSchema, payload),
    config
  );
}
