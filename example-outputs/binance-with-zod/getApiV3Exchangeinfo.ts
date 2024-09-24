import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getApiV3ExchangeinfoEndpointSchema = {
  path: '/api/v3/exchangeInfo',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string().optional(),
    symbols: z.string().optional(),
    permissions: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            timezone: z.string(),
            serverTime: z.number().int().safe().finite(),
            rateLimits: z.array(
              z.object({
                rateLimitType: z.string(),
                interval: z.string(),
                intervalNum: z.number().int().safe().finite(),
                limit: z.number().int().safe().finite(),
              })
            ),
            exchangeFilters: z.array(z.object({})),
            symbols: z.array(
              z.object({
                symbol: z.string(),
                status: z.string(),
                baseAsset: z.string(),
                baseAssetPrecision: z.number().int().safe().finite(),
                quoteAsset: z.string(),
                quoteAssetPrecision: z.number().int().safe().finite(),
                baseCommissionPrecision: z.number().int().safe().finite(),
                quoteCommissionPrecision: z.number().int().safe().finite(),
                orderTypes: z.array(z.string()),
                icebergAllowed: z.boolean(),
                ocoAllowed: z.boolean(),
                otoAllowed: z.boolean(),
                quoteOrderQtyMarketAllowed: z.boolean(),
                allowTrailingStop: z.boolean(),
                cancelReplaceAllowed: z.boolean(),
                isSpotTradingAllowed: z.boolean(),
                isMarginTradingAllowed: z.boolean(),
                filters: z.array(
                  z.object({
                    filterType: z.string(),
                    minPrice: z.string(),
                    maxPrice: z.string(),
                    tickSize: z.string(),
                  })
                ),
                permissions: z.array(z.string()),
                permissionSets: z.array(z.array(z.string())),
                defaultSelfTradePreventionMode: z.string(),
                allowedSelfTradePreventionModes: z.array(z.string()),
              })
            ),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
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
  requestHandler: RequestHandler,
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
