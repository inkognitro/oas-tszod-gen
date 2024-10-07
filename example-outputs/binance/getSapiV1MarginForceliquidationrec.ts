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

export const getSapiV1MarginForceliquidationrecEndpointSchema = {
  path: '/sapi/v1/margin/forceLiquidationRec',
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

export type GetSapiV1MarginForceliquidationrecRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    isolatedSymbol?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginForceliquidationrecResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            avgPrice: string;
            executedQty: string;
            orderId: number; // int
            price: string;
            qty: string;
            side: string;
            symbol: string;
            timeInForce: string;
            isIsolated: boolean;
            updatedTime: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginForceliquidationrecRequestResult = RequestResult<
  GetSapiV1MarginForceliquidationrecRequest,
  GetSapiV1MarginForceliquidationrecResponse
>;

export function getSapiV1MarginForceliquidationrec(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginForceliquidationrecRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginForceliquidationrecRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginForceliquidationrecEndpointSchema, payload),
    config
  );
}
