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

export const getSapiV1LoanVipOngoingOrdersEndpointSchema = {
  path: '/sapi/v1/loan/vip/ongoing/orders',
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

export type GetSapiV1LoanVipOngoingOrdersRequest = RequestUnion<
  any,
  any,
  {
    orderId?: number; // int
    collateralAccountId?: number; // int
    loanCoin?: string;
    collateralCoin?: string;
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LoanVipOngoingOrdersResponse =
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
            collateralAccountId: string;
            collateralCoin: string;
            collateralValue: string;
            totalCollateralValueAfterHaircut?: string;
            lockedCollateralValue?: string;
            currentLTV: string;
            expirationTime: number; // int
            loanDate: string;
            loanRate: string;
            loanTerm: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanVipOngoingOrdersRequestResult = RequestResult<
  GetSapiV1LoanVipOngoingOrdersRequest,
  GetSapiV1LoanVipOngoingOrdersResponse
>;

export function getSapiV1LoanVipOngoingOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1LoanVipOngoingOrdersRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipOngoingOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LoanVipOngoingOrdersEndpointSchema, payload),
    config
  );
}
