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

export type GetSapiV1LoanRepayCollateralRateRequest = RequestUnion<
  any,
  any,
  {
    loanCoin: string;
    collateralCoin: string;
    repayAmount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

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
  GetSapiV1LoanRepayCollateralRateRequest,
  GetSapiV1LoanRepayCollateralRateResponse
>;

export function getSapiV1LoanRepayCollateralRate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LoanRepayCollateralRateRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanRepayCollateralRateRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LoanRepayCollateralRateEndpointSchema, payload),
    config
  );
}
