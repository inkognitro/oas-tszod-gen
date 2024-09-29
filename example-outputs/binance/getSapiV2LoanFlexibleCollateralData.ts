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

export const getSapiV2LoanFlexibleCollateralDataEndpointSchema = {
  path: '/sapi/v2/loan/flexible/collateral/data',
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

export type GetSapiV2LoanFlexibleCollateralDataPayload = {
  queryParams: {
    collateralCoin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2LoanFlexibleCollateralDataResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            collateralCoin: string;
            initialLTV: string;
            marginCallLTV: string;
            liquidationLTV: string;
            maxLimit: string;
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2LoanFlexibleCollateralDataRequestResult = RequestResult<
  Request,
  GetSapiV2LoanFlexibleCollateralDataResponse
>;

export function getSapiV2LoanFlexibleCollateralData(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2LoanFlexibleCollateralDataPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleCollateralDataRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2LoanFlexibleCollateralDataEndpointSchema,
    }),
    config
  );
}
