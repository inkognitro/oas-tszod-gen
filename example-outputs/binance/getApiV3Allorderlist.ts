import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getApiV3AllorderlistEndpointSchema = {
  path: '/api/v3/allOrderList',
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

export type GetApiV3AllorderlistPayload = {
  queryParams: {
    fromId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3AllorderlistResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3AllorderlistRequestResult = RequestResult<
  Request,
  GetApiV3AllorderlistResponse
>;

export function getApiV3Allorderlist(
  requestHandler: RequestHandler,
  payload: GetApiV3AllorderlistPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AllorderlistRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3AllorderlistEndpointSchema,
    }),
    config
  );
}
