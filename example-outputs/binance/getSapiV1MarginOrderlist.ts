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

export const getSapiV1MarginOrderlistEndpointSchema = {
  path: '/sapi/v1/margin/orderList',
  method: 'get',
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

export type GetSapiV1MarginOrderlistRequest = RequestUnion<
  any,
  any,
  {
    isIsolated?: 'TRUE' | 'FALSE';
    symbol?: string;
    orderListId?: number; // int
    origClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginOrderlistResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderListId: number; // int
          contingencyType: string;
          listStatusType: string;
          listOrderStatus: string;
          listClientOrderId: string;
          transactionTime: number; // int
          symbol: string;
          isIsolated: boolean;
          orders: {
            symbol: string;
            orderId: number; // int
            clientOrderId: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginOrderlistRequestResult = RequestResult<
  GetSapiV1MarginOrderlistRequest,
  GetSapiV1MarginOrderlistResponse
>;

export function getSapiV1MarginOrderlist(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginOrderlistRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginOrderlistRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginOrderlistEndpointSchema, payload),
    config
  );
}
