import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1EthStakingWbethHistoryUnwraphistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/wbeth/history/unwrapHistory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type GetSapiV1EthStakingWbethHistoryUnwraphistoryRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1EthStakingWbethHistoryUnwraphistoryResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingWbethHistoryUnwraphistoryRequestResult =
  RequestResult<
    GetSapiV1EthStakingWbethHistoryUnwraphistoryRequest,
    GetSapiV1EthStakingWbethHistoryUnwraphistoryResponse
  >;

export function getSapiV1EthStakingWbethHistoryUnwraphistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1EthStakingWbethHistoryUnwraphistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingWbethHistoryUnwraphistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1EthStakingWbethHistoryUnwraphistoryEndpointSchema,
      payload
    ),
    config
  );
}
