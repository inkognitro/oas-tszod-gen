import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1AlgoFuturesSubordersEndpointSchema = {
  path: '/sapi/v1/algo/futures/subOrders',
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

export type GetSapiV1AlgoFuturesSubordersPayload = {
  queryParams: {
    algoId: number; // int
    page?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AlgoFuturesSubordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          executedQty: string;
          executedAmt: string;
          subOrders: {
            algoId: number; // int
            orderId: number; // int
            orderStatus: string;
            executedQty?: string;
            executedAmt: string;
            feeAmt: string;
            feeAsset: string;
            bookTime: number; // int
            avgPrice: string;
            side: string;
            symbol: string;
            subId: number; // int
            timeInForce: string;
            origQty: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AlgoFuturesSubordersRequestResult = RequestResult<
  Request,
  GetSapiV1AlgoFuturesSubordersResponse
>;

export function getSapiV1AlgoFuturesSuborders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AlgoFuturesSubordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoFuturesSubordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AlgoFuturesSubordersEndpointSchema,
    }),
    config
  );
}
