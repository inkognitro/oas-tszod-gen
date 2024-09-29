import {
  MarginOrderResponseAck,
  MarginOrderResponseResult,
  MarginOrderResponseFull,
  Error,
} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1MarginOrderEndpointSchema = {
  path: '/sapi/v1/margin/order',
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

export type PostSapiV1MarginOrderPayload = {
  queryParams: {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    side: 'SELL' | 'BUY';
    type:
      | 'LIMIT'
      | 'MARKET'
      | 'STOP_LOSS'
      | 'STOP_LOSS_LIMIT'
      | 'TAKE_PROFIT'
      | 'TAKE_PROFIT_LIMIT'
      | 'LIMIT_MAKER';
    quantity: number;
    quoteOrderQty?: number;
    price?: number;
    stopPrice?: number;
    newClientOrderId?: string;
    icebergQty?: number;
    newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
    sideEffectType?: 'NO_SIDE_EFFECT' | 'MARGIN_BUY' | 'AUTO_REPAY';
    timeInForce?: 'GTC' | 'IOC' | 'FOK';
    autoRepayAtCancel: boolean;
    selfTradePreventionMode?:
      | 'EXPIRE_TAKER'
      | 'EXPIRE_MAKER'
      | 'EXPIRE_BOTH'
      | 'NONE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1MarginOrderResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        | MarginOrderResponseAck
        | MarginOrderResponseResult
        | MarginOrderResponseFull
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1MarginOrderRequestResult = RequestResult<
  Request,
  PostSapiV1MarginOrderResponse
>;

export function postSapiV1MarginOrder(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1MarginOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MarginOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MarginOrderEndpointSchema,
    }),
    config
  );
}
