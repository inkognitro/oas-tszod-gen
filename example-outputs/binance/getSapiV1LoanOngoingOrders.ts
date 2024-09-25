import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1LoanOngoingOrdersEndpointSchema = {
  path: '/sapi/v1/loan/ongoing/orders',
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

export type GetSapiV1LoanOngoingOrdersPayload = {
  queryParams: {
    orderId?: number; // int
    loanCoin?: string;
    collateralCoin?: string;
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanOngoingOrdersResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LoanOngoingOrdersRequestResult = RequestResult<
  Request,
  GetSapiV1LoanOngoingOrdersResponse
>;

export function getSapiV1LoanOngoingOrders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanOngoingOrdersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanOngoingOrdersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanOngoingOrdersEndpointSchema,
    }),
    config
  );
}
