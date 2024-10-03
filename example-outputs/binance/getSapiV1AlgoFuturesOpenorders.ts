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

export const getSapiV1AlgoFuturesOpenordersEndpointSchema = {
  path: '/sapi/v1/algo/futures/openOrders',
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

export type GetSapiV1AlgoFuturesOpenordersRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AlgoFuturesOpenordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          orders?: {
            algoId: number; // int
            symbol: string;
            side: string;
            positionSide: string;
            totalQty: string;
            executedQty: string;
            executedAmt: string;
            avgPrice: string;
            clientAlgoId: string;
            bookTime: number; // int
            endTime: number; // int
            algoStatus: string;
            algoType: string;
            urgency: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AlgoFuturesOpenordersRequestResult = RequestResult<
  GetSapiV1AlgoFuturesOpenordersRequest,
  GetSapiV1AlgoFuturesOpenordersResponse
>;

export function getSapiV1AlgoFuturesOpenorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1AlgoFuturesOpenordersRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoFuturesOpenordersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AlgoFuturesOpenordersEndpointSchema, payload),
    config
  );
}
