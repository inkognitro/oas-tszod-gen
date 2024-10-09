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

export const getAvgPriceEndpointSchema = {
  path: '/api/v3/avgPrice',
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

export type GetAvgPriceRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
  }
>;

export type GetAvgPriceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          mins: number; // int
          price: string;
          closeTime: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetAvgPriceRequestResult = RequestResult<
  GetAvgPriceRequest,
  GetAvgPriceResponse
>;

export function getAvgPrice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAvgPriceRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAvgPriceRequestResult> {
  return requestHandler.execute(
    createRequest(getAvgPriceEndpointSchema, payload),
    config
  );
}
