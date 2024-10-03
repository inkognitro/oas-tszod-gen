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

export const postSapiV1AlgoFuturesNewordervpEndpointSchema = {
  path: '/sapi/v1/algo/futures/newOrderVp',
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

export type PostSapiV1AlgoFuturesNewordervpRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    side: 'SELL' | 'BUY';
    positionSide?: 'BOTH' | 'LONG' | 'SHORT';
    quantity: number;
    urgency: 'LOW' | 'MEDIUM' | 'HIGH';
    clientAlgoId?: string;
    reduceOnly?: boolean;
    limitPrice?: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1AlgoFuturesNewordervpResponse =
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

export type PostSapiV1AlgoFuturesNewordervpRequestResult = RequestResult<
  PostSapiV1AlgoFuturesNewordervpRequest,
  PostSapiV1AlgoFuturesNewordervpResponse
>;

export function postSapiV1AlgoFuturesNewordervp(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1AlgoFuturesNewordervpRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AlgoFuturesNewordervpRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1AlgoFuturesNewordervpEndpointSchema, payload),
    config
  );
}
