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

export const getSapiV1NftHistoryWithdrawEndpointSchema = {
  path: '/sapi/v1/nft/history/withdraw',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    page: z.number().int().safe().finite().optional(),
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
            list: z.array(
              z.object({
                network: z.string(),
                txID: z.string(),
                contractAdrress: z.string(),
                tokenId: z.string(),
                timestamp: z.number().int().safe().finite(),
                fee: z.number().safe().finite(),
                feeAsset: z.string(),
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

export type GetSapiV1NftHistoryWithdrawPayload = {
  queryParams: {
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    page?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1NftHistoryWithdrawResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          list: {
            network: string;
            txID: string;
            contractAdrress: string;
            tokenId: string;
            timestamp: number; // int
            fee: number;
            feeAsset: string;
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1NftHistoryWithdrawRequestResult = RequestResult<
  Request,
  GetSapiV1NftHistoryWithdrawResponse
>;

export function getSapiV1NftHistoryWithdraw(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1NftHistoryWithdrawPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1NftHistoryWithdrawRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1NftHistoryWithdrawEndpointSchema,
    }),
    config
  );
}
