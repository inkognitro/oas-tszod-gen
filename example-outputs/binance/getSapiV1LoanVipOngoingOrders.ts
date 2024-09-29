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

export const getSapiV1LoanVipOngoingOrdersEndpointSchema = {
  path: '/sapi/v1/loan/vip/ongoing/orders',
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

export type GetSapiV1LoanVipOngoingOrdersPayload = {
  queryParams: {
    orderId?: number; // int
    collateralAccountId?: number; // int
    loanCoin?: string;
    collateralCoin?: string;
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanVipOngoingOrdersResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanVipOngoingOrdersRequestResult = RequestResult<
  Request,
  GetSapiV1LoanVipOngoingOrdersResponse
>;

export function getSapiV1LoanVipOngoingOrders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanVipOngoingOrdersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipOngoingOrdersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanVipOngoingOrdersEndpointSchema,
    }),
    config
  );
}
