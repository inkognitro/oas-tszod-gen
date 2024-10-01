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

export const getSapiV1SubAccountSubTransferHistoryEndpointSchema = {
  path: '/sapi/v1/sub-account/sub/transfer/history',
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

export type GetSapiV1SubAccountSubTransferHistoryPayload = {
  queryParams: {
    fromEmail?: string;
    toEmail?: string;
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountSubTransferHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          from: string;
          to: string;
          asset: string;
          qty: string;
          status: string;
          tranId: number; // int
          time: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountSubTransferHistoryRequestResult = RequestResult<
  Request,
  GetSapiV1SubAccountSubTransferHistoryResponse
>;

export function getSapiV1SubAccountSubTransferHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountSubTransferHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountSubTransferHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountSubTransferHistoryEndpointSchema,
    }),
    config
  );
}
