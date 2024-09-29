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

export const getSapiV1PortfolioAssetIndexPriceEndpointSchema = {
  path: '/sapi/v1/portfolio/asset-index-price',
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

export type GetSapiV1PortfolioAssetIndexPricePayload = {
  queryParams: {
    asset?: string;
  };
};

export type GetSapiV1PortfolioAssetIndexPriceResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          assetIndexPrice: string;
          time: number; // int
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioAssetIndexPriceRequestResult = RequestResult<
  Request,
  GetSapiV1PortfolioAssetIndexPriceResponse
>;

export function getSapiV1PortfolioAssetIndexPrice(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1PortfolioAssetIndexPricePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioAssetIndexPriceRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1PortfolioAssetIndexPriceEndpointSchema,
    }),
    config
  );
}
