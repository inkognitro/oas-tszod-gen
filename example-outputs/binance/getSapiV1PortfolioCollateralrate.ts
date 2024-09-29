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

export const getSapiV1PortfolioCollateralrateEndpointSchema = {
  path: '/sapi/v1/portfolio/collateralRate',
  method: 'get',
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
  },
};

export type GetSapiV1PortfolioCollateralrateResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          collateralRate: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioCollateralrateRequestResult = RequestResult<
  Request,
  GetSapiV1PortfolioCollateralrateResponse
>;

export function getSapiV1PortfolioCollateralrate(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioCollateralrateRequestResult> {
  return requestHandler.execute(
    createRequest({
      endpointSchema: getSapiV1PortfolioCollateralrateEndpointSchema,
    }),
    config
  );
}
