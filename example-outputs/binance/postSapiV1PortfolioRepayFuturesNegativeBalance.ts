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

export type PostSapiV1PortfolioRepayFuturesNegativeBalanceRequest =
  RequestUnion<
    any,
    any,
    {
      recvWindow?: number; // int
      timestamp: number; // int
      signature: string;
    }
  >;

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
    PostSapiV1PortfolioRepayFuturesNegativeBalanceRequest,
    PostSapiV1PortfolioRepayFuturesNegativeBalanceResponse
  >;

export function postSapiV1PortfolioRepayFuturesNegativeBalance(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1PortfolioRepayFuturesNegativeBalanceRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioRepayFuturesNegativeBalanceRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1PortfolioRepayFuturesNegativeBalanceEndpointSchema,
      payload
    ),
    config
  );
}
