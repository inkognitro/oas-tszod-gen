import {
  z_BookTicker,
  z_BookTickerList,
  z_Error,
  BookTicker,
  BookTickerList,
  Error,
} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const getApiV3TickerBooktickerEndpointSchema = {
  path: '/api/v3/ticker/bookTicker',
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
          zodSchema: z.union([z_BookTicker, z_BookTickerList]),
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

export type GetApiV3TickerBooktickerRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
  }
>;

export type GetApiV3TickerBooktickerResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', BookTicker | BookTickerList>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3TickerBooktickerRequestResult = RequestResult<
  GetApiV3TickerBooktickerRequest,
  GetApiV3TickerBooktickerResponse
>;

export function getApiV3TickerBookticker(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3TickerBooktickerRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TickerBooktickerRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3TickerBooktickerEndpointSchema, payload),
    config
  );
}
