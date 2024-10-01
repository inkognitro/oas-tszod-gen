import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postApiV3OrderTestEndpointSchema = {
  path: '/api/v3/order/test',
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

export type PostApiV3OrderTestPayload = {
  queryParams: {
    symbol: string;
    side: 'SELL' | 'BUY';
    type:
      | 'LIMIT'
      | 'MARKET'
      | 'STOP_LOSS'
      | 'STOP_LOSS_LIMIT'
      | 'TAKE_PROFIT'
      | 'TAKE_PROFIT_LIMIT'
      | 'LIMIT_MAKER';
    timeInForce?: 'GTC' | 'IOC' | 'FOK';
    quantity?: number;
    quoteOrderQty?: number;
    price?: number;
    newClientOrderId?: string;
    strategyId?: number; // int
    strategyType?: number; // int
    stopPrice?: number;
    trailingDelta?: number;
    icebergQty?: number;
    newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
    recvWindow?: number; // int
    computeCommissionRates?: boolean;
    timestamp: number; // int
    signature: string;
  };
};

export type PostApiV3OrderTestResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostApiV3OrderTestRequestResult = RequestResult<
  Request,
  PostApiV3OrderTestResponse
>;

export function postApiV3OrderTest(
  requestHandler: SimpleRequestHandler,
  payload: PostApiV3OrderTestPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3OrderTestRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postApiV3OrderTestEndpointSchema,
    }),
    config
  );
}
