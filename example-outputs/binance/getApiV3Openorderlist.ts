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

export const getApiV3OpenorderlistEndpointSchema = {
  path: '/api/v3/openOrderList',
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

export type GetApiV3OpenorderlistPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3OpenorderlistResponse =
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

export type GetApiV3OpenorderlistRequestResult = RequestResult<
  Request,
  GetApiV3OpenorderlistResponse
>;

export function getApiV3Openorderlist(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3OpenorderlistPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3OpenorderlistRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3OpenorderlistEndpointSchema,
    }),
    config
  );
}
