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

export const postSapiV1EthStakingWbethWrapEndpointSchema = {
  path: '/sapi/v1/eth-staking/wbeth/wrap',
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

export type PostSapiV1EthStakingWbethWrapRequest = RequestUnion<
  any,
  any,
  {
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1EthStakingWbethWrapResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1EthStakingWbethWrapRequestResult = RequestResult<
  PostSapiV1EthStakingWbethWrapRequest,
  PostSapiV1EthStakingWbethWrapResponse
>;

export function postSapiV1EthStakingWbethWrap(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1EthStakingWbethWrapRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1EthStakingWbethWrapRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1EthStakingWbethWrapEndpointSchema, payload),
    config
  );
}
