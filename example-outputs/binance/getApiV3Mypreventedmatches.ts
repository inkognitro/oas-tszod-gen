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

export const getApiV3MypreventedmatchesEndpointSchema = {
  path: '/api/v3/myPreventedMatches',
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

export type GetApiV3MypreventedmatchesPayload = {
  queryParams: {
    symbol: string;
    preventedMatchId?: number; // int
    orderId?: number; // int
    fromPreventedMatchId?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3MypreventedmatchesResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3MypreventedmatchesRequestResult = RequestResult<
  Request,
  GetApiV3MypreventedmatchesResponse
>;

export function getApiV3Mypreventedmatches(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3MypreventedmatchesPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3MypreventedmatchesRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3MypreventedmatchesEndpointSchema,
    }),
    config
  );
}
