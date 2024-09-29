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

export const postSapiV1AlgoFuturesNewordertwapEndpointSchema = {
  path: '/sapi/v1/algo/futures/newOrderTwap',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostSapiV1AlgoFuturesNewordertwapPayload = {
  queryParams: {
    symbol: string;
    side: 'SELL' | 'BUY';
    positionSide?: 'BOTH' | 'LONG' | 'SHORT';
    quantity: number;
    duration: number; // int
    clientAlgoId?: string;
    reduceOnly?: boolean;
    limitPrice?: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AlgoFuturesNewordertwapResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          clientAlgoId: string;
          success: boolean;
          code: number; // int
          msg: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AlgoFuturesNewordertwapRequestResult = RequestResult<
  Request,
  PostSapiV1AlgoFuturesNewordertwapResponse
>;

export function postSapiV1AlgoFuturesNewordertwap(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1AlgoFuturesNewordertwapPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AlgoFuturesNewordertwapRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AlgoFuturesNewordertwapEndpointSchema,
    }),
    config
  );
}
