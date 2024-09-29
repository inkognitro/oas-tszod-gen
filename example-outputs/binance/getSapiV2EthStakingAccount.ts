import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV2EthStakingAccountEndpointSchema = {
  path: '/sapi/v2/eth-staking/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

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
