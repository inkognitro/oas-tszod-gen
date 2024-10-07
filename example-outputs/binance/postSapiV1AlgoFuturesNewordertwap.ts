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

export const postSapiV1AlgoFuturesNewordertwapEndpointSchema = {
  path: '/sapi/v1/algo/futures/newOrderTwap',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type PostSapiV1AlgoFuturesNewordertwapRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type PostSapiV1AlgoFuturesNewordertwapResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AlgoFuturesNewordertwapRequestResult = RequestResult<
  PostSapiV1AlgoFuturesNewordertwapRequest,
  PostSapiV1AlgoFuturesNewordertwapResponse
>;

export function postSapiV1AlgoFuturesNewordertwap(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1AlgoFuturesNewordertwapRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AlgoFuturesNewordertwapRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1AlgoFuturesNewordertwapEndpointSchema, payload),
    config
  );
}
