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

export type GetSapiV1PortfolioMarginAssetLeverageResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            asset?: string;
            collateralRate?: string;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1PortfolioMarginAssetLeverageRequestResult = RequestResult<
  Request,
  GetSapiV1PortfolioMarginAssetLeverageResponse
>;

export function getSapiV1PortfolioMarginAssetLeverage(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioMarginAssetLeverageRequestResult> {
  return requestHandler.execute(
    createRequest({
      endpointSchema: getSapiV1PortfolioMarginAssetLeverageEndpointSchema,
    }),
    config
  );
}
