import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';
import {Error} from '../../../../';

export const postPlaceOrderEndpointSchema = {
  path: '/sapi/v1/convert/limit/placeOrder',
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

export type PostPlaceOrderRequest = RequestUnion<
  any,
  any,
  {
    baseAsset: string;
    quoteAsset: string;
    limitPrice: number;
    baseAmount?: number;
    quoteAmount?: number;
    side: 'SELL' | 'BUY';
    walletType?: 'SPOT' | 'FUNDING' | 'SPOT_FUNDING';
    expiredType?: '1_D' | '3_D' | '7_D' | '30_D';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostPlaceOrderResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderId: number; // int
          status: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostPlaceOrderRequestResult = RequestResult<
  PostPlaceOrderRequest,
  PostPlaceOrderResponse
>;

export function postPlaceOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostPlaceOrderRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostPlaceOrderRequestResult> {
  return requestHandler.execute(
    createRequest(postPlaceOrderEndpointSchema, payload),
    config
  );
}
