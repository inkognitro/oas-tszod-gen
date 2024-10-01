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

export const deleteSapiV1AlgoSpotOrderEndpointSchema = {
  path: '/sapi/v1/algo/spot/order',
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

export type DeleteSapiV1AlgoSpotOrderPayload = {
  queryParams: {
    algoId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteSapiV1AlgoSpotOrderResponse =
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

export type DeleteSapiV1AlgoSpotOrderRequestResult = RequestResult<
  Request,
  DeleteSapiV1AlgoSpotOrderResponse
>;

export function deleteSapiV1AlgoSpotOrder(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1AlgoSpotOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1AlgoSpotOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1AlgoSpotOrderEndpointSchema,
    }),
    config
  );
}
