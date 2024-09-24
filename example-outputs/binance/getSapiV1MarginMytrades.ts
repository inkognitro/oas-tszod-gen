import {MarginTrade, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MarginMytradesEndpointSchema = {
  path: '/sapi/v1/margin/myTrades',
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

export type GetSapiV1MarginMytradesPayload = {
  queryParams: {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    startTime?: number; // int
    endTime?: number; // int
    fromId?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginMytradesResponse =
  | Response<
      200,
      ResponseData<ResponseBodyData<'application/json', MarginTrade[]>>
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginMytradesRequestResult = RequestResult<
  Request,
  GetSapiV1MarginMytradesResponse
>;

export function getSapiV1MarginMytrades(
  requestHandler: RequestHandler,
  payload: GetSapiV1MarginMytradesPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginMytradesRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginMytradesEndpointSchema,
    }),
    config
  );
}
