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

export const getSapiV1LoanLtvAdjustmentHistoryEndpointSchema = {
  path: '/sapi/v1/loan/ltv/adjustment/history',
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

export type GetSapiV1LoanLtvAdjustmentHistoryPayload = {
  queryParams: {
    orderId?: number; // int
    loanCoin?: string;
    collateralCoin?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanLtvAdjustmentHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            loanCoin: string;
            collateralCoin: string;
            direction: string;
            amount: string;
            preLTV: string;
            afterLTV: string;
            adjustTime: number; // int
            orderId: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanLtvAdjustmentHistoryRequestResult = RequestResult<
  Request,
  GetSapiV1LoanLtvAdjustmentHistoryResponse
>;

export function getSapiV1LoanLtvAdjustmentHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanLtvAdjustmentHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanLtvAdjustmentHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanLtvAdjustmentHistoryEndpointSchema,
    }),
    config
  );
}
