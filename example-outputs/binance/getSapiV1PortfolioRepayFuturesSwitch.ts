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

export const getSapiV1PortfolioRepayFuturesSwitchEndpointSchema = {
  path: '/sapi/v1/portfolio/repay-futures-switch',
  method: 'get',
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

export type GetSapiV1PortfolioRepayFuturesSwitchPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1PortfolioRepayFuturesSwitchResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            autoRepay: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1PortfolioRepayFuturesSwitchRequestResult = RequestResult<
  Request,
  GetSapiV1PortfolioRepayFuturesSwitchResponse
>;

export function getSapiV1PortfolioRepayFuturesSwitch(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1PortfolioRepayFuturesSwitchPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioRepayFuturesSwitchRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1PortfolioRepayFuturesSwitchEndpointSchema,
    }),
    config
  );
}
