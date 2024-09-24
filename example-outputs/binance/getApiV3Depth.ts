import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getApiV3DepthEndpointSchema = {
  path: '/api/v3/depth',
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

export type GetApiV3DepthPayload = {
  queryParams: {
    symbol: string;
    limit?: number; // int
  };
};

export type GetApiV3DepthResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            lastUpdateId: number; // int
            bids: string[][];
            asks: string[][];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3DepthRequestResult = RequestResult<
  Request,
  GetApiV3DepthResponse
>;

export function getApiV3Depth(
  requestHandler: RequestHandler,
  payload: GetApiV3DepthPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3DepthRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3DepthEndpointSchema}),
    config
  );
}
