import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV2EthStakingEthStakeEndpointSchema = {
  path: '/sapi/v2/eth-staking/eth/stake',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            success: boolean;
            wbethAmount: string;
            conversionRatio: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

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
