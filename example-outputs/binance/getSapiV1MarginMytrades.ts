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
import {MarginTrade, Error} from '@example-outputs/binance';

export const getSapiV1MarginMytradesEndpointSchema = {
  path: '/sapi/v1/margin/myTrades',
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

export type GetSapiV1MarginMytradesRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    startTime?: number; // int
    endTime?: number; // int
    fromId?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginMytradesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', MarginTrade[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginMytradesRequestResult = RequestResult<
  GetSapiV1MarginMytradesRequest,
  GetSapiV1MarginMytradesResponse
>;

export function getSapiV1MarginMytrades(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginMytradesRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginMytradesRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginMytradesEndpointSchema, payload),
    config
  );
}
