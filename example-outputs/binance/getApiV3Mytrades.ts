import {MyTrade, Error} from '@example-outputs/binance';
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

export const getApiV3MytradesEndpointSchema = {
  path: '/api/v3/myTrades',
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

export type GetApiV3MytradesPayload = {
  queryParams: {
    symbol: string;
    orderId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    fromId?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3MytradesResponse =
  | Response<200, ResponseData<ResponseBodyData<'application/json', MyTrade[]>>>
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3MytradesRequestResult = RequestResult<
  Request,
  GetApiV3MytradesResponse
>;

export function getApiV3Mytrades(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3MytradesPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3MytradesRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3MytradesEndpointSchema}),
    config
  );
}
