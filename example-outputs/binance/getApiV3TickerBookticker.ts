import {BookTicker, BookTickerList, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getApiV3TickerBooktickerEndpointSchema = {
  path: '/api/v3/ticker/bookTicker',
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

export type GetApiV3TickerBooktickerPayload = {
  queryParams: {
    symbol?: string;
    symbols?: string;
  };
};

export type GetApiV3TickerBooktickerResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', BookTicker | BookTickerList>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3TickerBooktickerRequestResult = RequestResult<
  Request,
  GetApiV3TickerBooktickerResponse
>;

export function getApiV3TickerBookticker(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3TickerBooktickerPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TickerBooktickerRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3TickerBooktickerEndpointSchema,
    }),
    config
  );
}
