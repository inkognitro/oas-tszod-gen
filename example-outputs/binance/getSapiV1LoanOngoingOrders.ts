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

export const getSapiV1LoanOngoingOrdersEndpointSchema = {
  path: '/sapi/v1/loan/ongoing/orders',
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

export type GetSapiV1LoanOngoingOrdersRequest = RequestUnion<
  any,
  any,
  {
    orderId?: number; // int
    loanCoin?: string;
    collateralCoin?: string;
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LoanOngoingOrdersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            orderId: number; // int
            loanCoin: string;
            totalDebt: string;
            residualInterest: string;
            collateralCoin: string;
            collateralAmount: string;
            currentLTV: string;
            expirationTime: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanOngoingOrdersRequestResult = RequestResult<
  GetSapiV1LoanOngoingOrdersRequest,
  GetSapiV1LoanOngoingOrdersResponse
>;

export function getSapiV1LoanOngoingOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1LoanOngoingOrdersRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanOngoingOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LoanOngoingOrdersEndpointSchema, payload),
    config
  );
}
