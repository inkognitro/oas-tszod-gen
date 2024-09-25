import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postApiV3SorOrderTestEndpointSchema = {
  path: '/api/v3/sor/order/test',
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

export type PostApiV3SorOrderTestPayload = {
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
    quantity: number;
    price?: number;
    newClientOrderId?: string;
    strategyId?: number; // int
    strategyType?: number; // int
    icebergQty?: number;
    newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
    selfTradePreventionMode?:
      | 'EXPIRE_TAKER'
      | 'EXPIRE_MAKER'
      | 'EXPIRE_BOTH'
      | 'NONE';
    computeCommissionRates?: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostApiV3SorOrderTestResponse =
  | Response<200, ResponseData<ResponseBodyData<'application/json', {}>>>
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostApiV3SorOrderTestRequestResult = RequestResult<
  Request,
  PostApiV3SorOrderTestResponse
>;

export function postApiV3SorOrderTest(
  requestHandler: SimpleRequestHandler,
  payload: PostApiV3SorOrderTestPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3SorOrderTestRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postApiV3SorOrderTestEndpointSchema,
    }),
    config
  );
}
