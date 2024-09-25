import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetApiV3AvgpricePayload = {
  queryParams: {
    symbol: string;
  };
};

export type GetApiV3AvgpriceResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            mins: number; // int
            price: string;
            closeTime: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3AvgpriceRequestResult = RequestResult<
  Request,
  GetApiV3AvgpriceResponse
>;

export function getApiV3Avgprice(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3AvgpricePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AvgpriceRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3AvgpriceEndpointSchema}),
    config
  );
}
