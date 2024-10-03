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

export const deleteSapiV1AlgoFuturesOrderEndpointSchema = {
  path: '/sapi/v1/algo/futures/order',
  method: 'delete',
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

export type DeleteSapiV1AlgoFuturesOrderRequest = RequestUnion<
  any,
  any,
  {
    algoId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteSapiV1AlgoFuturesOrderResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          algoId: number; // int
          success: boolean;
          code: number; // int
          msg: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1AlgoFuturesOrderRequestResult = RequestResult<
  DeleteSapiV1AlgoFuturesOrderRequest,
  DeleteSapiV1AlgoFuturesOrderResponse
>;

export function deleteSapiV1AlgoFuturesOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteSapiV1AlgoFuturesOrderRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1AlgoFuturesOrderRequestResult> {
  return requestHandler.execute(
    createRequest(deleteSapiV1AlgoFuturesOrderEndpointSchema, payload),
    config
  );
}
