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
import {PriceTicker, PriceTickerList, Error} from '../../../';

export const getPriceEndpointSchema = {
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
