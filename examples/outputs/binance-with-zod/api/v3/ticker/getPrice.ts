import {
  z_PriceTicker,
  z_PriceTickerList,
  z_Error,
  PriceTicker,
  PriceTickerList,
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

export const getPriceEndpointSchema = {
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
          zodSchema: z.union([z_PriceTicker, z_PriceTickerList]),
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

export type GetPriceRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
  }
>;

export type GetPriceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', PriceTicker | PriceTickerList>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetPriceRequestResult = RequestResult<
  GetPriceRequest,
  GetPriceResponse
>;

export function getPrice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetPriceRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetPriceRequestResult> {
  return requestHandler.execute(
    createRequest(getPriceEndpointSchema, payload),
    config
  );
}
