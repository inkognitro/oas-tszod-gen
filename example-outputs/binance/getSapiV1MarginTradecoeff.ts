import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MarginTradecoeffEndpointSchema = {
  path: '/sapi/v1/margin/tradeCoeff',
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

export type GetSapiV1MarginTradecoeffPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginTradecoeffResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          normalBar?: string;
          marginCallBar?: string;
          forceLiquidationBar?: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginTradecoeffRequestResult = RequestResult<
  Request,
  GetSapiV1MarginTradecoeffResponse
>;

export function getSapiV1MarginTradecoeff(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginTradecoeffPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginTradecoeffRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginTradecoeffEndpointSchema,
    }),
    config
  );
}
