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

export const getSapiV1EthStakingEthQuotaEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/quota',
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

export type GetSapiV1EthStakingEthQuotaPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1EthStakingEthQuotaResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          leftStakingPersonalQuota: string;
          leftRedemptionPersonalQuota: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthQuotaRequestResult = RequestResult<
  Request,
  GetSapiV1EthStakingEthQuotaResponse
>;

export function getSapiV1EthStakingEthQuota(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1EthStakingEthQuotaPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthQuotaRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1EthStakingEthQuotaEndpointSchema,
    }),
    config
  );
}
