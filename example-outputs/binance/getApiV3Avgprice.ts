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

export const getApiV3AvgpriceEndpointSchema = {
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

export type GetApiV3AvgpriceRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
  }
>;

export type GetApiV3AvgpriceResponse =
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

export type GetApiV3AvgpriceRequestResult = RequestResult<
  GetApiV3AvgpriceRequest,
  GetApiV3AvgpriceResponse
>;

export function getApiV3Avgprice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3AvgpriceRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AvgpriceRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3AvgpriceEndpointSchema, payload),
    config
  );
}
