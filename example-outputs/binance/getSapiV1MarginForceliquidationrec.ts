import {Error} from '@example-outputs/binance';
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

export const getSapiV1MarginForceliquidationrecEndpointSchema = {
  path: '/sapi/v1/margin/forceLiquidationRec',
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

export type GetSapiV1MarginForceliquidationrecPayload = {
  queryParams: {
    startTime?: number; // int
    endTime?: number; // int
    isolatedSymbol?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginForceliquidationrecResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginForceliquidationrecRequestResult = RequestResult<
  Request,
  GetSapiV1MarginForceliquidationrecResponse
>;

export function getSapiV1MarginForceliquidationrec(
  requestHandler: RequestHandler,
  payload: GetSapiV1MarginForceliquidationrecPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginForceliquidationrecRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginForceliquidationrecEndpointSchema,
    }),
    config
  );
}
