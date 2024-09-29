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

export const getSapiV1FuturesTransferEndpointSchema = {
  path: '/sapi/v1/futures/transfer',
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

export type GetSapiV1FuturesTransferPayload = {
  queryParams: {
    asset: string;
    startTime: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1FuturesTransferResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            asset: string;
            tranId: number; // int
            amount: string;
            type: string;
            timestamp: number; // int
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1FuturesTransferRequestResult = RequestResult<
  Request,
  GetSapiV1FuturesTransferResponse
>;

export function getSapiV1FuturesTransfer(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1FuturesTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1FuturesTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1FuturesTransferEndpointSchema,
    }),
    config
  );
}
