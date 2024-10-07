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

export type PostApiV3OrderTestRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type PostApiV3OrderTestResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostApiV3OrderTestRequestResult = RequestResult<
  PostApiV3OrderTestRequest,
  PostApiV3OrderTestResponse
>;

export function postApiV3OrderTest(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostApiV3OrderTestRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3OrderTestRequestResult> {
  return requestHandler.execute(
    createRequest(postApiV3OrderTestEndpointSchema, payload),
    config
  );
}
