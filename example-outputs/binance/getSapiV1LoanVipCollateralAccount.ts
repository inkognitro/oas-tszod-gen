import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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
  Request,
  GetSapiV1LoanVipCollateralAccountResponse
>;

export function getSapiV1LoanVipCollateralAccount(
  requestHandler: SimpleRequestHandler,
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
