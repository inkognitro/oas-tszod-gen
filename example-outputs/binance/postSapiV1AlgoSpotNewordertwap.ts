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

export type PostSapiV1AlgoSpotNewordertwapPayload = {
  queryParams: {
    symbol: string;
    side: 'SELL' | 'BUY';
    quantity: number;
    duration: number; // int
    clientAlgoId?: string;
    limitPrice?: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AlgoSpotNewordertwapResponse =
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

export type PostSapiV1AlgoSpotNewordertwapRequestResult = RequestResult<
  Request,
  PostSapiV1AlgoSpotNewordertwapResponse
>;

export function postSapiV1AlgoSpotNewordertwap(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1AlgoSpotNewordertwapPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AlgoSpotNewordertwapRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AlgoSpotNewordertwapEndpointSchema,
    }),
    config
  );
}
