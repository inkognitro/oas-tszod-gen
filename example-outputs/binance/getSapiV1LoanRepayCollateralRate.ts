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

export const getSapiV1LoanRepayCollateralRateEndpointSchema = {
  path: '/sapi/v1/loan/repay/collateral/rate',
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

export type GetSapiV1LoanRepayCollateralRatePayload = {
  queryParams: {
    loanCoin: string;
    collateralCoin: string;
    repayAmount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanRepayCollateralRateResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanCoin: string;
          collateralCoin: string;
          repayAmount: string;
          rate: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanRepayCollateralRateRequestResult = RequestResult<
  Request,
  GetSapiV1LoanRepayCollateralRateResponse
>;

export function getSapiV1LoanRepayCollateralRate(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanRepayCollateralRatePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanRepayCollateralRateRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanRepayCollateralRateEndpointSchema,
    }),
    config
  );
}
