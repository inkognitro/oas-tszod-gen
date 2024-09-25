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

export const getSapiV2EthStakingAccountEndpointSchema = {
  path: '/sapi/v2/eth-staking/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV2EthStakingAccountPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2EthStakingAccountResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV2EthStakingAccountRequestResult = RequestResult<
  Request,
  GetSapiV2EthStakingAccountResponse
>;

export function getSapiV2EthStakingAccount(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2EthStakingAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2EthStakingAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2EthStakingAccountEndpointSchema,
    }),
    config
  );
}
