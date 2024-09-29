import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1LoanIncomeEndpointSchema = {
  path: '/sapi/v1/loan/income',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    type: z
      .enum([
        'borrowIn',
        'collateralSpent',
        'repayAmount',
        'collateralReturn',
        'addCollateral',
        'removeCollateral',
        'collateralReturnAfterLiquidation',
      ])
      .optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              asset: z.string(),
              type: z.string(),
              amount: z.string(),
              timestamp: z.number().int().safe().finite(),
              tranId: z.string(),
            })
          ),
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

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
