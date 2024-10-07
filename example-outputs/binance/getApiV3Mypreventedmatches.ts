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

export const getApiV3MypreventedmatchesEndpointSchema = {
  path: '/api/v3/myPreventedMatches',
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

export type GetApiV3MypreventedmatchesRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    preventedMatchId?: number; // int
    orderId?: number; // int
    fromPreventedMatchId?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiV3MypreventedmatchesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol: string;
          preventedMatchId: number; // int
          takerOrderId: number; // int
          makerOrderId: number; // int
          tradeGroupId: number; // int
          selfTradePreventionMode: string;
          price: string;
          makerPreventedQuantity: string;
          transactTime: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3MypreventedmatchesRequestResult = RequestResult<
  GetApiV3MypreventedmatchesRequest,
  GetApiV3MypreventedmatchesResponse
>;

export function getApiV3Mypreventedmatches(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetApiV3MypreventedmatchesRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3MypreventedmatchesRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3MypreventedmatchesEndpointSchema, payload),
    config
  );
}
