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

export const getSapiV1LoanVipRequestInterestrateEndpointSchema = {
  path: '/sapi/v1/loan/vip/request/interestRate',
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

export type GetSapiV1LoanVipRequestInterestrateRequest = RequestUnion<
  any,
  any,
  {
    loanCoin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LoanVipRequestInterestrateResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          flexibleDailyInterestRate: string;
          flexibleYearlyInterestRate: string;
          time: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanVipRequestInterestrateRequestResult = RequestResult<
  GetSapiV1LoanVipRequestInterestrateRequest,
  GetSapiV1LoanVipRequestInterestrateResponse
>;

export function getSapiV1LoanVipRequestInterestrate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LoanVipRequestInterestrateRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipRequestInterestrateRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LoanVipRequestInterestrateEndpointSchema, payload),
    config
  );
}
