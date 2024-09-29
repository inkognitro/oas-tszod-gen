import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
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
      ResponseBodyData<
        'application/json',
        {
          lastUpdateId: number; // int
          bids: string[][];
          asks: string[][];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3DepthRequestResult = RequestResult<
  Request,
  GetApiV3DepthResponse
>;

export function getApiV3Depth(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3DepthPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3DepthRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3DepthEndpointSchema}),
    config
  );
}
