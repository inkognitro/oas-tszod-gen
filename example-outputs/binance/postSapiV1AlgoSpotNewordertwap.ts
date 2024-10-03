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

export const postSapiV1AlgoSpotNewordertwapEndpointSchema = {
  path: '/sapi/v1/algo/spot/newOrderTwap',
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

export type PostSapiV1AlgoSpotNewordertwapRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    side: 'SELL' | 'BUY';
    quantity: number;
    duration: number; // int
    clientAlgoId?: string;
    limitPrice?: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1AlgoSpotNewordertwapResponse =
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

export type PostSapiV1AlgoSpotNewordertwapRequestResult = RequestResult<
  PostSapiV1AlgoSpotNewordertwapRequest,
  PostSapiV1AlgoSpotNewordertwapResponse
>;

export function postSapiV1AlgoSpotNewordertwap(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1AlgoSpotNewordertwapRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AlgoSpotNewordertwapRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1AlgoSpotNewordertwapEndpointSchema, payload),
    config
  );
}
