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

export const postSapiV1PortfolioRepayFuturesSwitchEndpointSchema = {
  path: '/sapi/v1/portfolio/repay-futures-switch',
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

export type PostSapiV1PortfolioRepayFuturesSwitchRequest = RequestUnion<
  any,
  any,
  {
    autoRepay: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1PortfolioRepayFuturesSwitchResponse =
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

export type PostSapiV1PortfolioRepayFuturesSwitchRequestResult = RequestResult<
  PostSapiV1PortfolioRepayFuturesSwitchRequest,
  PostSapiV1PortfolioRepayFuturesSwitchResponse
>;

export function postSapiV1PortfolioRepayFuturesSwitch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1PortfolioRepayFuturesSwitchRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1PortfolioRepayFuturesSwitchRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1PortfolioRepayFuturesSwitchEndpointSchema, payload),
    config
  );
}
