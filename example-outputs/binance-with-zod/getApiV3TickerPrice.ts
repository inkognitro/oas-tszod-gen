import {
  priceTickerZodSchema,
  priceTickerListZodSchema,
  errorZodSchema,
  PriceTicker,
  PriceTickerList,
  Error,
} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getApiV3TickerPriceEndpointSchema = {
  path: '/api/v3/ticker/price',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string().optional(),
    symbols: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([priceTickerZodSchema, priceTickerListZodSchema]),
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

export type GetApiV3TickerPricePayload = {
  queryParams: {
    symbol?: string;
    symbols?: string;
  };
};

export type GetApiV3TickerPriceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', PriceTicker | PriceTickerList>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3TickerPriceRequestResult = RequestResult<
  Request,
  GetApiV3TickerPriceResponse
>;

export function getApiV3TickerPrice(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3TickerPricePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TickerPriceRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3TickerPriceEndpointSchema,
    }),
    config
  );
}
