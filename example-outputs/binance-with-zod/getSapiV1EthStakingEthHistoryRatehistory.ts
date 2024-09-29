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

export const getSapiV1EthStakingEthHistoryRatehistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/rateHistory',
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
                annualPercentageRate: z.string(),
                exchangeRate: z.string(),
                time: z.number().int().safe().finite(),
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

export type GetSapiV1EthStakingEthHistoryRatehistoryPayload = {
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

export type GetSapiV1EthStakingEthHistoryRatehistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            annualPercentageRate: string;
            exchangeRate: string;
            time: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthHistoryRatehistoryRequestResult =
  RequestResult<Request, GetSapiV1EthStakingEthHistoryRatehistoryResponse>;

export function getSapiV1EthStakingEthHistoryRatehistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1EthStakingEthHistoryRatehistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthHistoryRatehistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1EthStakingEthHistoryRatehistoryEndpointSchema,
    }),
    config
  );
}
