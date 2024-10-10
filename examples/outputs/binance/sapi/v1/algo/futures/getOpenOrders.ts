import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';
import {Error} from '../../../../';

export const getOpenOrdersEndpointSchema = {
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

export type GetOpenOrdersRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetOpenOrdersResponse =
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

export type GetOpenOrdersRequestResult = RequestResult<
  GetOpenOrdersRequest,
  GetOpenOrdersResponse
>;

export function getOpenOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetOpenOrdersRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetOpenOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(getOpenOrdersEndpointSchema, payload),
    config
  );
}
