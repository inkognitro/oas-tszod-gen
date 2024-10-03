import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSapiV2LoanFlexibleLtvAdjustmentHistoryEndpointSchema = {
  path: '/sapi/v2/loan/flexible/ltv/adjustment/history',
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

export type GetSapiV2LoanFlexibleLtvAdjustmentHistoryRequest = RequestUnion<
  any,
  any,
  {
    loanCoin?: string;
    collateralCoin?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV2LoanFlexibleLtvAdjustmentHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            loanCoin: string;
            collateralCoin: string;
            direction: string;
            collateralAmount: string;
            preLTV: string;
            afterLTV: string;
            adjustTime: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2LoanFlexibleLtvAdjustmentHistoryRequestResult =
  RequestResult<
    GetSapiV2LoanFlexibleLtvAdjustmentHistoryRequest,
    GetSapiV2LoanFlexibleLtvAdjustmentHistoryResponse
  >;

export function getSapiV2LoanFlexibleLtvAdjustmentHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV2LoanFlexibleLtvAdjustmentHistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleLtvAdjustmentHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV2LoanFlexibleLtvAdjustmentHistoryEndpointSchema,
      payload
    ),
    config
  );
}
