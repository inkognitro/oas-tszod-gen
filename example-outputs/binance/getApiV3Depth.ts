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

export type GetApiV3DepthRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    limit?: number; // int
  }
>;

export type GetApiV3DepthResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3DepthRequestResult = RequestResult<
  GetApiV3DepthRequest,
  GetApiV3DepthResponse
>;

export function getApiV3Depth(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3DepthRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3DepthRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3DepthEndpointSchema, payload),
    config
  );
}
