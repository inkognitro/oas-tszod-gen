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

export const getSapiV1SubAccountFuturesInternaltransferEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/internalTransfer',
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

export type GetSapiV1SubAccountFuturesInternaltransferPayload = {
  queryParams: {
    email: string;
    futuresType: number; // int
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountFuturesInternaltransferResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            success: boolean;
            futuresType: number; // int
            transfers: {
              from: string;
              to: string;
              asset: string;
              qty: string;
              tranId: number; // int
              time: number; // int
            }[];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1SubAccountFuturesInternaltransferRequestResult =
  RequestResult<Request, GetSapiV1SubAccountFuturesInternaltransferResponse>;

export function getSapiV1SubAccountFuturesInternaltransfer(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountFuturesInternaltransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountFuturesInternaltransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountFuturesInternaltransferEndpointSchema,
    }),
    config
  );
}
