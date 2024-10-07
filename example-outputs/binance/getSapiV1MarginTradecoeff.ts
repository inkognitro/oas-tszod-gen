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

export const getSapiV1MarginTradecoeffEndpointSchema = {
  path: '/sapi/v1/margin/tradeCoeff',
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

export type GetSapiV1MarginTradecoeffRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginTradecoeffResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginTradecoeffRequestResult = RequestResult<
  GetSapiV1MarginTradecoeffRequest,
  GetSapiV1MarginTradecoeffResponse
>;

export function getSapiV1MarginTradecoeff(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginTradecoeffRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginTradecoeffRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginTradecoeffEndpointSchema, payload),
    config
  );
}
