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

export type GetApiV3ExchangeinfoRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
    permissions?: string;
  }
>;

export type GetApiV3ExchangeinfoResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3ExchangeinfoRequestResult = RequestResult<
  GetApiV3ExchangeinfoRequest,
  GetApiV3ExchangeinfoResponse
>;

export function getApiV3Exchangeinfo(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3ExchangeinfoRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3ExchangeinfoRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3ExchangeinfoEndpointSchema, payload),
    config
  );
}
