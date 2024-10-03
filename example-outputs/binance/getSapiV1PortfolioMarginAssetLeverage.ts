import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSapiV1PortfolioMarginAssetLeverageEndpointSchema = {
  path: '/sapi/v1/portfolio/margin-asset-leverage',
  method: 'get',
  supportedSecuritySchemas: [],
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

export type GetSapiV1PortfolioMarginAssetLeverageRequest = Request;

export type GetSapiV1PortfolioMarginAssetLeverageResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset?: string;
          collateralRate?: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioMarginAssetLeverageRequestResult = RequestResult<
  GetSapiV1PortfolioMarginAssetLeverageRequest,
  GetSapiV1PortfolioMarginAssetLeverageResponse
>;

export function getSapiV1PortfolioMarginAssetLeverage(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioMarginAssetLeverageRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1PortfolioMarginAssetLeverageEndpointSchema),
    config
  );
}
