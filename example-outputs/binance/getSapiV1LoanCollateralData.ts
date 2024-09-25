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

export const getSapiV1LoanCollateralDataEndpointSchema = {
  path: '/sapi/v1/loan/collateral/data',
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

export type GetSapiV1LoanCollateralDataPayload = {
  queryParams: {
    collateralCoin?: string;
    vipLevel?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanCollateralDataResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              collateralCoin: string;
              initialLTV: string;
              marginCallLTV: string;
              liquidationLTV: string;
              maxLimit: string;
              vipLevel: number; // int
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LoanCollateralDataRequestResult = RequestResult<
  Request,
  GetSapiV1LoanCollateralDataResponse
>;

export function getSapiV1LoanCollateralData(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanCollateralDataPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanCollateralDataRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanCollateralDataEndpointSchema,
    }),
    config
  );
}
