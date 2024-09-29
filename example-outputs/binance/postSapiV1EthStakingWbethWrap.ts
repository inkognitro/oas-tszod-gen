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

export const postSapiV1EthStakingWbethWrapEndpointSchema = {
  path: '/sapi/v1/eth-staking/wbeth/wrap',
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

export type PostSapiV1EthStakingWbethWrapPayload = {
  queryParams: {
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1EthStakingWbethWrapResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
          wbethAmount: string;
          exchangeRate: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1EthStakingWbethWrapRequestResult = RequestResult<
  Request,
  PostSapiV1EthStakingWbethWrapResponse
>;

export function postSapiV1EthStakingWbethWrap(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1EthStakingWbethWrapPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1EthStakingWbethWrapRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1EthStakingWbethWrapEndpointSchema,
    }),
    config
  );
}
