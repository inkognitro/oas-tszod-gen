import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';
import {Error} from '../../../';

export const getForceLiquidationRecEndpointSchema = {
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

export type GetForceLiquidationRecRequest = RequestUnion<
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

export type GetForceLiquidationRecResponse =
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

export type GetForceLiquidationRecRequestResult = RequestResult<
  GetForceLiquidationRecRequest,
  GetForceLiquidationRecResponse
>;

export function getForceLiquidationRec(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetForceLiquidationRecRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetForceLiquidationRecRequestResult> {
  return requestHandler.execute(
    createRequest(getForceLiquidationRecEndpointSchema, payload),
    config
  );
}
