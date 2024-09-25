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

export const getSapiV1AlgoSpotSubordersEndpointSchema = {
  path: '/sapi/v1/algo/spot/subOrders',
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

export type GetSapiV1AlgoSpotSubordersPayload = {
  queryParams: {
    algoId: number; // int
    page?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AlgoSpotSubordersResponse =
  | Response<
      200,
      ResponseData<
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
              executedQty: string;
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1AlgoSpotSubordersRequestResult = RequestResult<
  Request,
  GetSapiV1AlgoSpotSubordersResponse
>;

export function getSapiV1AlgoSpotSuborders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AlgoSpotSubordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoSpotSubordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AlgoSpotSubordersEndpointSchema,
    }),
    config
  );
}
