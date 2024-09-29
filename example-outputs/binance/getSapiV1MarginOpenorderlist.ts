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

export const getSapiV1MarginOpenorderlistEndpointSchema = {
  path: '/sapi/v1/margin/openOrderList',
  method: 'get',
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

export type GetSapiV1MarginOpenorderlistPayload = {
  queryParams: {
    isIsolated?: 'TRUE' | 'FALSE';
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginOpenorderlistResponse =
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
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginOpenorderlistRequestResult = RequestResult<
  Request,
  GetSapiV1MarginOpenorderlistResponse
>;

export function getSapiV1MarginOpenorderlist(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginOpenorderlistPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginOpenorderlistRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginOpenorderlistEndpointSchema,
    }),
    config
  );
}
