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

export const getSapiV2EthStakingAccountEndpointSchema = {
  path: '/sapi/v2/eth-staking/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
            holdingInETH: z.string(),
            holdings: z.object({
              wbethAmount: z.string(),
              bethAmount: z.string(),
            }),
            thirtyDaysProfitInETH: z.string(),
            profit: z.object({
              amountFromWBETH: z.string(),
              amountFromBETH: z.string(),
            }),
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

export type GetSapiV2EthStakingAccountRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV2EthStakingAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          holdingInETH: string;
          holdings: {
            wbethAmount: string;
            bethAmount: string;
          };
          thirtyDaysProfitInETH: string;
          profit: {
            amountFromWBETH: string;
            amountFromBETH: string;
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2EthStakingAccountRequestResult = RequestResult<
  GetSapiV2EthStakingAccountRequest,
  GetSapiV2EthStakingAccountResponse
>;

export function getSapiV2EthStakingAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV2EthStakingAccountRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2EthStakingAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV2EthStakingAccountEndpointSchema, payload),
    config
  );
}
