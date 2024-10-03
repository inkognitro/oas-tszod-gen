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

export const getSapiV2LoanFlexibleOngoingOrdersEndpointSchema = {
  path: '/sapi/v2/loan/flexible/ongoing/orders',
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

export type GetSapiV2LoanFlexibleOngoingOrdersRequest = RequestUnion<
  any,
  any,
  {
    loanCoin?: string;
    collateralCoin?: string;
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV2LoanFlexibleOngoingOrdersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            loanCoin: string;
            totalDebt: string;
            collateralCoin: string;
            collateralAmount: string;
            currentLTV: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2LoanFlexibleOngoingOrdersRequestResult = RequestResult<
  GetSapiV2LoanFlexibleOngoingOrdersRequest,
  GetSapiV2LoanFlexibleOngoingOrdersResponse
>;

export function getSapiV2LoanFlexibleOngoingOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV2LoanFlexibleOngoingOrdersRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleOngoingOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV2LoanFlexibleOngoingOrdersEndpointSchema, payload),
    config
  );
}
