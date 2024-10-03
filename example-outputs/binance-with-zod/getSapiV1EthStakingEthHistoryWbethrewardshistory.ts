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

export const getSapiV1EthStakingEthHistoryWbethrewardshistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/wbethRewardsHistory',
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
            estRewardsInETH: z.string(),
            rows: z.array(
              z.object({
                time: z.number().int().safe().finite(),
                amountInETH: z.string(),
                holding: z.string(),
                holdingInETH: z.string(),
                annualPercentageRate: z.string(),
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

export type GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequest =
  RequestUnion<
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

export type GetSapiV1EthStakingEthHistoryWbethrewardshistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          estRewardsInETH: string;
          rows: {
            time: number; // int
            amountInETH: string;
            holding: string;
            holdingInETH: string;
            annualPercentageRate: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequestResult =
  RequestResult<
    GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequest,
    GetSapiV1EthStakingEthHistoryWbethrewardshistoryResponse
  >;

export function getSapiV1EthStakingEthHistoryWbethrewardshistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1EthStakingEthHistoryWbethrewardshistoryEndpointSchema,
      payload
    ),
    config
  );
}
