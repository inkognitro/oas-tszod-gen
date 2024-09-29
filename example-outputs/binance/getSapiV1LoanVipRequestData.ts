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

export const getSapiV1LoanVipRequestDataEndpointSchema = {
  path: '/sapi/v1/loan/vip/request/data',
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

export type GetSapiV1LoanVipRequestDataPayload = {
  queryParams: {
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanVipRequestDataResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanVipRequestDataRequestResult = RequestResult<
  Request,
  GetSapiV1LoanVipRequestDataResponse
>;

export function getSapiV1LoanVipRequestData(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanVipRequestDataPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipRequestDataRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanVipRequestDataEndpointSchema,
    }),
    config
  );
}
