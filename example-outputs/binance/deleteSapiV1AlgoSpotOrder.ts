import {Error} from '@example-outputs/binance';
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

export const deleteSapiV1AlgoSpotOrderEndpointSchema = {
  path: '/sapi/v1/algo/spot/order',
  method: 'delete',
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

export type DeleteSapiV1AlgoSpotOrderPayload = {
  queryParams: {
    algoId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteSapiV1AlgoSpotOrderResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

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
