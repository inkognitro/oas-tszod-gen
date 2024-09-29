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

export type GetSapiV1MarginOrderlistPayload = {
  queryParams: {
    isIsolated?: 'TRUE' | 'FALSE';
    symbol?: string;
    orderListId?: number; // int
    origClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginOrderlistResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginOrderlistRequestResult = RequestResult<
  Request,
  GetSapiV1MarginOrderlistResponse
>;

export function getSapiV1MarginOrderlist(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginOrderlistPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginOrderlistRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginOrderlistEndpointSchema,
    }),
    config
  );
}
