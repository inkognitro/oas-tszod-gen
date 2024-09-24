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

export const getSapiV1SubAccountUniversaltransferEndpointSchema = {
  path: '/sapi/v1/sub-account/universalTransfer',
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

export type GetSapiV1SubAccountUniversaltransferPayload = {
  queryParams: {
    fromEmail?: string;
    toEmail?: string;
    clientTranId?: string;
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountUniversaltransferResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            tranId: number; // int
            fromEmail: string;
            toEmail: string;
            asset: string;
            amount: string;
            fromAccountType: string;
            toAccountType: string;
            status: string;
            createTimeStamp: number; // int
            clientTranId: string;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1SubAccountUniversaltransferRequestResult = RequestResult<
  Request,
  GetSapiV1SubAccountUniversaltransferResponse
>;

export function getSapiV1SubAccountUniversaltransfer(
  requestHandler: RequestHandler,
  payload: GetSapiV1SubAccountUniversaltransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountUniversaltransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountUniversaltransferEndpointSchema,
    }),
    config
  );
}
