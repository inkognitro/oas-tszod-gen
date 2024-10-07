import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

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
  payload: RequestPayload<
    GetSapiV2EthStakingAccountRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2EthStakingAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV2EthStakingAccountEndpointSchema, payload),
    config
  );
}
