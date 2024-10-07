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

export const getSapiV1EthStakingEthHistoryRedemptionhistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/redemptionHistory',
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
                arrivalTime: z.number().int().safe().finite(),
                asset: z.string(),
                amount: z.string(),
                status: z.string(),
                distributeAsset: z.string(),
                distributeAmount: z.string(),
                conversionRatio: z.string(),
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

export type GetSapiV1EthStakingEthHistoryRedemptionhistoryRequest =
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

export type GetSapiV1EthStakingEthHistoryRedemptionhistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            time: number; // int
            arrivalTime: number; // int
            asset: string;
            amount: string;
            status: string;
            distributeAsset: string;
            distributeAmount: string;
            conversionRatio: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthHistoryRedemptionhistoryRequestResult =
  RequestResult<
    GetSapiV1EthStakingEthHistoryRedemptionhistoryRequest,
    GetSapiV1EthStakingEthHistoryRedemptionhistoryResponse
  >;

export function getSapiV1EthStakingEthHistoryRedemptionhistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1EthStakingEthHistoryRedemptionhistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthHistoryRedemptionhistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1EthStakingEthHistoryRedemptionhistoryEndpointSchema,
      payload
    ),
    config
  );
}
