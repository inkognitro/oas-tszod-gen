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

export const getSapiV1EthStakingEthHistoryRewardshistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/rewardsHistory',
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
                asset: z.string(),
                holding: z.string(),
                amount: z.string(),
                annualPercentageRate: z.string(),
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

export type GetSapiV1EthStakingEthHistoryRewardshistoryRequest = RequestUnion<
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

export type GetSapiV1EthStakingEthHistoryRewardshistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            time: number; // int
            asset: string;
            holding: string;
            amount: string;
            annualPercentageRate: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthHistoryRewardshistoryRequestResult =
  RequestResult<
    GetSapiV1EthStakingEthHistoryRewardshistoryRequest,
    GetSapiV1EthStakingEthHistoryRewardshistoryResponse
  >;

export function getSapiV1EthStakingEthHistoryRewardshistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1EthStakingEthHistoryRewardshistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthHistoryRewardshistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1EthStakingEthHistoryRewardshistoryEndpointSchema,
      payload
    ),
    config
  );
}
