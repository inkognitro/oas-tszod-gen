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

export const getSapiV1LoanIncomeEndpointSchema = {
  path: '/sapi/v1/loan/income',
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

export type GetSapiV1LoanIncomePayload = {
  queryParams: {
    asset?: string;
    type?:
      | 'borrowIn'
      | 'collateralSpent'
      | 'repayAmount'
      | 'collateralReturn'
      | 'addCollateral'
      | 'removeCollateral'
      | 'collateralReturnAfterLiquidation';
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanIncomeResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            asset: string;
            type: string;
            amount: string;
            timestamp: number; // int
            tranId: string;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LoanIncomeRequestResult = RequestResult<
  Request,
  GetSapiV1LoanIncomeResponse
>;

export function getSapiV1LoanIncome(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanIncomePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanIncomeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanIncomeEndpointSchema,
    }),
    config
  );
}
