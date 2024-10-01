import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV2EthStakingEthStakeEndpointSchema = {
  path: '/sapi/v2/eth-staking/eth/stake',
  method: 'post',
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

export type PostSapiV2EthStakingEthStakePayload = {
  queryParams: {
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV2EthStakingEthStakeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
          wbethAmount: string;
          conversionRatio: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV2EthStakingEthStakeRequestResult = RequestResult<
  Request,
  PostSapiV2EthStakingEthStakeResponse
>;

export function postSapiV2EthStakingEthStake(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV2EthStakingEthStakePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV2EthStakingEthStakeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV2EthStakingEthStakeEndpointSchema,
    }),
    config
  );
}
