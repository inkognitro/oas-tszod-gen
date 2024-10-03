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
import {PriceTicker, PriceTickerList, Error} from '@example-outputs/binance';

export const getApiV3TickerPriceEndpointSchema = {
  path: '/api/v3/ticker/price',
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

export type GetApiV3TickerPriceRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
  }
>;

export type GetApiV3TickerPriceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', PriceTicker | PriceTickerList>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3TickerPriceRequestResult = RequestResult<
  GetApiV3TickerPriceRequest,
  GetApiV3TickerPriceResponse
>;

export function getApiV3TickerPrice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3TickerPriceRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TickerPriceRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3TickerPriceEndpointSchema, payload),
    config
  );
}
