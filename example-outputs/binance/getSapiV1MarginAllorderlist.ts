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

export const getSapiV1MarginAllorderlistEndpointSchema = {
  path: '/sapi/v1/margin/allOrderList',
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

export type GetSapiV1MarginAllorderlistPayload = {
  queryParams: {
    isIsolated?: 'TRUE' | 'FALSE';
    symbol?: string;
    fromId?: string;
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginAllorderlistResponse =
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

export type GetSapiV1MarginAllorderlistRequestResult = RequestResult<
  Request,
  GetSapiV1MarginAllorderlistResponse
>;

export function getSapiV1MarginAllorderlist(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginAllorderlistPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAllorderlistRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginAllorderlistEndpointSchema,
    }),
    config
  );
}
