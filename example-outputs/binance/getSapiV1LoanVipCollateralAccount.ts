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

export const getSapiV1LoanVipCollateralAccountEndpointSchema = {
  path: '/sapi/v1/loan/vip/collateral/account',
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

export type GetSapiV1LoanVipCollateralAccountRequest = RequestUnion<
  any,
  any,
  {
    orderId?: number; // int
    collateralAccountId?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LoanVipCollateralAccountResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanVipCollateralAccountRequestResult = RequestResult<
  GetSapiV1LoanVipCollateralAccountRequest,
  GetSapiV1LoanVipCollateralAccountResponse
>;

export function getSapiV1LoanVipCollateralAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LoanVipCollateralAccountRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipCollateralAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LoanVipCollateralAccountEndpointSchema, payload),
    config
  );
}
