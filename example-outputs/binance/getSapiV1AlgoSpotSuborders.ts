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

export const getSapiV1AlgoSpotSubordersEndpointSchema = {
  path: '/sapi/v1/algo/spot/subOrders',
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

export type GetSapiV1AlgoSpotSubordersRequest = RequestUnion<
  any,
  any,
  {
    algoId: number; // int
    page?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AlgoSpotSubordersResponse =
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AlgoSpotSubordersRequestResult = RequestResult<
  GetSapiV1AlgoSpotSubordersRequest,
  GetSapiV1AlgoSpotSubordersResponse
>;

export function getSapiV1AlgoSpotSuborders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1AlgoSpotSubordersRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoSpotSubordersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AlgoSpotSubordersEndpointSchema, payload),
    config
  );
}
