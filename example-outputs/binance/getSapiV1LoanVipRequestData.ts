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

export const getSapiV1LoanVipRequestDataEndpointSchema = {
  path: '/sapi/v1/loan/vip/request/data',
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

export type GetSapiV1LoanVipRequestDataRequest = RequestUnion<
  any,
  any,
  {
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LoanVipRequestDataResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            loanAccountId: string;
            orderId: string;
            requestId: string;
            loanCoin: string;
            loanAmount: string;
            collateralAccountId: string;
            collateralCoin: string;
            loanTerm: number; // int
            status: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanVipRequestDataRequestResult = RequestResult<
  GetSapiV1LoanVipRequestDataRequest,
  GetSapiV1LoanVipRequestDataResponse
>;

export function getSapiV1LoanVipRequestData(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1LoanVipRequestDataRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipRequestDataRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LoanVipRequestDataEndpointSchema, payload),
    config
  );
}
