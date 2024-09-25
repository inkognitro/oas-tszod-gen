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

export const getSapiV1AssetConvertTransferQuerybypageEndpointSchema = {
  path: '/sapi/v1/asset/convert-transfer/queryByPage',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    tranId: z.number().int().safe().finite().optional(),
    asset: z.string().optional(),
    startTime: z.number().int().safe().finite(),
    endTime: z.number().int().safe().finite(),
    accountType: z.enum('MAIN', 'CARD').optional(),
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
            total: z.number().int().safe().finite(),
            rows: z.array(
              z.object({
                tranId: z.number().int().safe().finite(),
                type: z.number().int().safe().finite(),
                time: z.number().int().safe().finite(),
                deductedAsset: z.string(),
                deductedAmount: z.string(),
                targetAsset: z.string(),
                targetAmount: z.string(),
                status: z.string(),
                accountType: z.string(),
              })
            ),
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

export type GetSapiV1AssetConvertTransferQuerybypagePayload = {
  queryParams: {
    tranId?: number; // int
    asset?: string;
    startTime: number; // int
    endTime: number; // int
    accountType?: 'MAIN' | 'CARD';
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AssetConvertTransferQuerybypageResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            total: number; // int
            rows: {
              tranId: number; // int
              type: number; // int
              time: number; // int
              deductedAsset: string;
              deductedAmount: string;
              targetAsset: string;
              targetAmount: string;
              status: string;
              accountType: string;
            }[];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1AssetConvertTransferQuerybypageRequestResult =
  RequestResult<Request, GetSapiV1AssetConvertTransferQuerybypageResponse>;

export function getSapiV1AssetConvertTransferQuerybypage(
  requestHandler: RequestHandler,
  payload: GetSapiV1AssetConvertTransferQuerybypagePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetConvertTransferQuerybypageRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AssetConvertTransferQuerybypageEndpointSchema,
    }),
    config
  );
}
