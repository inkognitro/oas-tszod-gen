import {
  z_BookTicker,
  z_BookTickerList,
  z_Error,
  BookTicker,
  BookTickerList,
  Error,
} from '../../../';
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
} from '../../../core';

export const getBookTickerEndpointSchema = {
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

export type GetBookTickerRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
  }
>;

export type GetBookTickerResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', BookTicker | BookTickerList>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetBookTickerRequestResult = RequestResult<
  GetBookTickerRequest,
  GetBookTickerResponse
>;

export function getBookTicker(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetBookTickerRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetBookTickerRequestResult> {
  return requestHandler.execute(
    createRequest(getBookTickerEndpointSchema, payload),
    config
  );
}
