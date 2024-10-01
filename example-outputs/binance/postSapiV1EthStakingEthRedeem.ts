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

export type PostSapiV1EthStakingEthRedeemPayload = {
  queryParams: {
    asset?: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  PostSapiV1EthStakingEthRedeemResponse
>;

export function postSapiV1EthStakingEthRedeem(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1EthStakingEthRedeemPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1EthStakingEthRedeemRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1EthStakingEthRedeemEndpointSchema,
    }),
    config
  );
}
