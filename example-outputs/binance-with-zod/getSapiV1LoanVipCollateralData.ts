import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1LoanVipCollateralDataEndpointSchema = {
  path: '/sapi/v1/loan/vip/collateral/data',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    collateralCoin: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            rows: z.array(
              z.object({
                collateralCoin: z.string(),
                _1stCollateralRatio: z.string(),
                _1stCollateralRange: z.string(),
                _2ndCollateralRatio: z.string(),
                _2ndCollateralRange: z.string(),
                _3rdCollateralRatio: z.string(),
                _3rdCollateralRange: z.string(),
                _4thCollateralRatio: z.string(),
                _4thCollateralRange: z.string(),
              })
            ),
            total: z.number().int().safe().finite(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1LoanVipCollateralDataPayload = {
  queryParams: {
    collateralCoin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanVipCollateralDataResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              collateralCoin: string;
              _1stCollateralRatio: string;
              _1stCollateralRange: string;
              _2ndCollateralRatio: string;
              _2ndCollateralRange: string;
              _3rdCollateralRatio: string;
              _3rdCollateralRange: string;
              _4thCollateralRatio: string;
              _4thCollateralRange: string;
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LoanVipCollateralDataRequestResult = RequestResult<
  Request,
  GetSapiV1LoanVipCollateralDataResponse
>;

export function getSapiV1LoanVipCollateralData(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanVipCollateralDataPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipCollateralDataRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanVipCollateralDataEndpointSchema,
    }),
    config
  );
}
