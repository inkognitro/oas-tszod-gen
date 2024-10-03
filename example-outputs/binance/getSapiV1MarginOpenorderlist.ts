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

export const getSapiV1MarginOpenorderlistEndpointSchema = {
  path: '/sapi/v1/margin/openOrderList',
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

export type GetSapiV1MarginOpenorderlistRequest = RequestUnion<
  any,
  any,
  {
    isIsolated?: 'TRUE' | 'FALSE';
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginOpenorderlistResponse =
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
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginOpenorderlistRequestResult = RequestResult<
  GetSapiV1MarginOpenorderlistRequest,
  GetSapiV1MarginOpenorderlistResponse
>;

export function getSapiV1MarginOpenorderlist(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginOpenorderlistRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginOpenorderlistRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginOpenorderlistEndpointSchema, payload),
    config
  );
}
