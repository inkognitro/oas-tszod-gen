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

export const getApiV3ExchangeinfoEndpointSchema = {
  path: '/api/v3/exchangeInfo',
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
  },
};

export type GetApiV3ExchangeinfoPayload = {
  queryParams: {
    symbol?: string;
    symbols?: string;
    permissions?: string;
  };
};

export type GetApiV3ExchangeinfoResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            timezone: string;
            serverTime: number; // int
            rateLimits: {
              rateLimitType: string;
              interval: string;
              intervalNum: number; // int
              limit: number; // int
            }[];
            exchangeFilters: {}[];
            symbols: {
              symbol: string;
              status: string;
              baseAsset: string;
              baseAssetPrecision: number; // int
              quoteAsset: string;
              quoteAssetPrecision: number; // int
              baseCommissionPrecision: number; // int
              quoteCommissionPrecision: number; // int
              orderTypes: string[];
              icebergAllowed: boolean;
              ocoAllowed: boolean;
              otoAllowed: boolean;
              quoteOrderQtyMarketAllowed: boolean;
              allowTrailingStop: boolean;
              cancelReplaceAllowed: boolean;
              isSpotTradingAllowed: boolean;
              isMarginTradingAllowed: boolean;
              filters: {
                filterType: string;
                minPrice: string;
                maxPrice: string;
                tickSize: string;
              }[];
              permissions: string[];
              permissionSets: string[][];
              defaultSelfTradePreventionMode: string;
              allowedSelfTradePreventionModes: string[];
            }[];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3ExchangeinfoRequestResult = RequestResult<
  Request,
  GetApiV3ExchangeinfoResponse
>;

export function getApiV3Exchangeinfo(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3ExchangeinfoPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3ExchangeinfoRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3ExchangeinfoEndpointSchema,
    }),
    config
  );
}
