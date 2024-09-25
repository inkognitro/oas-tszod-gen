import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1EthStakingWbethHistoryWraphistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/wbeth/history/wrapHistory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
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
                time: z.number().int().safe().finite(),
                fromAsset: z.string(),
                fromAmount: z.string(),
                toAsset: z.string(),
                toAmount: z.string(),
                exchangeRate: z.string(),
                status: z.string(),
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

export type GetSapiV1EthStakingWbethHistoryWraphistoryPayload = {
  queryParams: {
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1EthStakingWbethHistoryWraphistoryResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              time: number; // int
              fromAsset: string;
              fromAmount: string;
              toAsset: string;
              toAmount: string;
              exchangeRate: string;
              status: string;
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1EthStakingWbethHistoryWraphistoryRequestResult =
  RequestResult<Request, GetSapiV1EthStakingWbethHistoryWraphistoryResponse>;

export function getSapiV1EthStakingWbethHistoryWraphistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1EthStakingWbethHistoryWraphistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingWbethHistoryWraphistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1EthStakingWbethHistoryWraphistoryEndpointSchema,
    }),
    config
  );
}
