import {z_Error, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1LoanIncomeEndpointSchema = {
  path: '/sapi/v1/loan/income',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetSapiV1LoanIncomeRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetSapiV1LoanIncomeResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanIncomeRequestResult = RequestResult<
  GetSapiV1LoanIncomeRequest,
  GetSapiV1LoanIncomeResponse
>;

export function getSapiV1LoanIncome(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1LoanIncomeRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanIncomeRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LoanIncomeEndpointSchema, payload),
    config
  );
}
