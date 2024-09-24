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

export const getSapiV1LoanVipRepayHistoryEndpointSchema = {
  path: '/sapi/v1/loan/vip/repay/history',
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

export type GetSapiV1LoanVipRepayHistoryPayload = {
  queryParams: {
    orderId?: number; // int
    loanCoin?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanVipRepayHistoryResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              loanCoin: string;
              repayAmount: string;
              collateralCoin: string;
              repayStatus: string;
              repayTime: string;
              orderId: string;
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LoanVipRepayHistoryRequestResult = RequestResult<
  Request,
  GetSapiV1LoanVipRepayHistoryResponse
>;

export function getSapiV1LoanVipRepayHistory(
  requestHandler: RequestHandler,
  payload: GetSapiV1LoanVipRepayHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipRepayHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanVipRepayHistoryEndpointSchema,
    }),
    config
  );
}
