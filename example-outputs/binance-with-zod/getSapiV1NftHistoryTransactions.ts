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

export const getSapiV1NftHistoryTransactionsEndpointSchema = {
  path: '/sapi/v1/nft/history/transactions',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    orderType: z.number().int().safe().finite(),
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
                orderNo: z.string(),
                tokens: z.array(
                  z.object({
                    network: z.string(),
                    tokenId: z.string(),
                    contractAddress: z.string(),
                  })
                ),
                tradeTime: z.number().int().safe().finite(),
                tradeAmount: z.string(),
                tradeCurrency: z.string(),
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

export type GetSapiV1NftHistoryTransactionsPayload = {
  queryParams: {
    orderType: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    page?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1NftHistoryTransactionsResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          list: {
            orderNo: string;
            tokens: {
              network: string;
              tokenId: string;
              contractAddress: string;
            }[];
            tradeTime: number; // int
            tradeAmount: string;
            tradeCurrency: string;
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1NftHistoryTransactionsRequestResult = RequestResult<
  Request,
  GetSapiV1NftHistoryTransactionsResponse
>;

export function getSapiV1NftHistoryTransactions(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1NftHistoryTransactionsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1NftHistoryTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1NftHistoryTransactionsEndpointSchema,
    }),
    config
  );
}
