import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type DeleteSapiV1AlgoFuturesOrderPayload = {
  queryParams: {
    algoId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  DeleteSapiV1AlgoFuturesOrderResponse
>;

export function deleteSapiV1AlgoFuturesOrder(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1AlgoFuturesOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1AlgoFuturesOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1AlgoFuturesOrderEndpointSchema,
    }),
    config
  );
}
