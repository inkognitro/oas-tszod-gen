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

export const getSapiV1LoanVipCollateralAccountEndpointSchema = {
  path: '/sapi/v1/loan/vip/collateral/account',
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

export type GetSapiV1LoanVipCollateralAccountPayload = {
  queryParams: {
    orderId?: number; // int
    collateralAccountId?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanVipCollateralAccountResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              collateralAccountId: string;
              collateralCoin: string;
              collateralValue: string;
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LoanVipCollateralAccountRequestResult = RequestResult<
  Request,
  GetSapiV1LoanVipCollateralAccountResponse
>;

export function getSapiV1LoanVipCollateralAccount(
  requestHandler: RequestHandler,
  payload: GetSapiV1LoanVipCollateralAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipCollateralAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanVipCollateralAccountEndpointSchema,
    }),
    config
  );
}
