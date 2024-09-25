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

export const getSapiV1AlgoSpotOpenordersEndpointSchema = {
  path: '/sapi/v1/algo/spot/openOrders',
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

export type GetSapiV1AlgoSpotOpenordersPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AlgoSpotOpenordersResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            total: number; // int
            orders: {
              algoId: number; // int
              symbol: string;
              side: string;
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1AlgoSpotOpenordersRequestResult = RequestResult<
  Request,
  GetSapiV1AlgoSpotOpenordersResponse
>;

export function getSapiV1AlgoSpotOpenorders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AlgoSpotOpenordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoSpotOpenordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AlgoSpotOpenordersEndpointSchema,
    }),
    config
  );
}
