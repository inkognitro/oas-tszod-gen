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

export const getSapiV1CapitalWithdrawHistoryEndpointSchema = {
  path: '/sapi/v1/capital/withdraw/history',
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

export type GetSapiV1CapitalWithdrawHistoryPayload = {
  queryParams: {
    coin?: string;
    withdrawOrderId?: string;
    status?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    offset?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1CapitalWithdrawHistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          address: string;
          amount: string;
          applyTime: string;
          coin: string;
          id: string;
          withdrawOrderId: string;
          network: string;
          transferType: number; // int
          status: number; // int
          transactionFee: string;
          confirmNo?: number; // int
          info?: string;
          txId: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalWithdrawHistoryRequestResult = RequestResult<
  Request,
  GetSapiV1CapitalWithdrawHistoryResponse
>;

export function getSapiV1CapitalWithdrawHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1CapitalWithdrawHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalWithdrawHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1CapitalWithdrawHistoryEndpointSchema,
    }),
    config
  );
}
