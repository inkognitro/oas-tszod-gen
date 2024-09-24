import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV2LoanFlexibleOngoingOrdersEndpointSchema = {
  path: '/sapi/v2/loan/flexible/ongoing/orders',
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

export type GetSapiV2LoanFlexibleOngoingOrdersPayload = {
  queryParams: {
    loanCoin?: string;
    collateralCoin?: string;
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2LoanFlexibleOngoingOrdersResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV2LoanFlexibleOngoingOrdersRequestResult = RequestResult<
  Request,
  GetSapiV2LoanFlexibleOngoingOrdersResponse
>;

export function getSapiV2LoanFlexibleOngoingOrders(
  requestHandler: RequestHandler,
  payload: GetSapiV2LoanFlexibleOngoingOrdersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleOngoingOrdersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2LoanFlexibleOngoingOrdersEndpointSchema,
    }),
    config
  );
}
