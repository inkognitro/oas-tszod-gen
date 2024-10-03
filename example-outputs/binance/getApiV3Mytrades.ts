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
import {MyTrade, Error} from '@example-outputs/binance';

export const getApiV3MytradesEndpointSchema = {
  path: '/api/v3/myTrades',
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

export type GetApiV3MytradesRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    orderId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    fromId?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiV3MytradesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', MyTrade[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3MytradesRequestResult = RequestResult<
  GetApiV3MytradesRequest,
  GetApiV3MytradesResponse
>;

export function getApiV3Mytrades(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3MytradesRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3MytradesRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3MytradesEndpointSchema, payload),
    config
  );
}
