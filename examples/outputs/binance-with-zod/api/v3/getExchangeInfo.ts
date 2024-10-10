import {z_Error, Error} from '../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../core';

export const getExchangeInfoEndpointSchema = {
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
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetExchangeInfoRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
    permissions?: string;
  }
>;

export type GetExchangeInfoResponse =
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

export type GetExchangeInfoRequestResult = RequestResult<
  GetExchangeInfoRequest,
  GetExchangeInfoResponse
>;

export function getExchangeInfo(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetExchangeInfoRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetExchangeInfoRequestResult> {
  return requestHandler.execute(
    createRequest(getExchangeInfoEndpointSchema, payload),
    config
  );
}
