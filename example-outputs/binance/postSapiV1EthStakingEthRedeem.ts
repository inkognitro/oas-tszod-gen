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

export const postSapiV1EthStakingEthRedeemEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/redeem',
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

export type PostSapiV1EthStakingEthRedeemRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1EthStakingEthRedeemResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
          arrivalTime: number; // int
          ethAmount: string;
          conversionRatio: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1EthStakingEthRedeemRequestResult = RequestResult<
  PostSapiV1EthStakingEthRedeemRequest,
  PostSapiV1EthStakingEthRedeemResponse
>;

export function postSapiV1EthStakingEthRedeem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1EthStakingEthRedeemRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1EthStakingEthRedeemRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1EthStakingEthRedeemEndpointSchema, payload),
    config
  );
}
