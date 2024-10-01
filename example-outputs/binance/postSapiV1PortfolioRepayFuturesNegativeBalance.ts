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

export const postSapiV1PortfolioRepayFuturesNegativeBalanceEndpointSchema = {
  path: '/sapi/v1/portfolio/repay-futures-negative-balance',
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

export type PostSapiV1PortfolioRepayFuturesNegativeBalancePayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1PortfolioRepayFuturesNegativeBalanceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          msg: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1PortfolioRepayFuturesNegativeBalanceRequestResult =
  RequestResult<
    Request,
    PostSapiV1PortfolioRepayFuturesNegativeBalanceResponse
  >;

export function postSapiV1PortfolioRepayFuturesNegativeBalance(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1PortfolioRepayFuturesNegativeBalancePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioRepayFuturesNegativeBalanceRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        postSapiV1PortfolioRepayFuturesNegativeBalanceEndpointSchema,
    }),
    config
  );
}
