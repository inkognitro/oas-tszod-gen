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

export const getSapiV1MarginCapitalFlowEndpointSchema = {
  path: '/sapi/v1/margin/capital-flow',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    symbol: z.string().optional(),
    type: z
      .enum([
        'TRANSFER',
        'BORROW',
        'REPAY',
        'BUY_INCOME',
        'BUY_EXPENSE',
        'SELL_INCOME',
        'SELL_EXPENSE',
        'TRADING_COMMISSION',
        'BUY_LIQUIDATION',
        'SELL_LIQUIDATION',
        'REPAY_LIQUIDATION',
        'OTHER_LIQUIDATION',
        'LIQUIDATION_FEE',
        'SMALL_BALANCE_CONVERT',
        'COMMISSION_RETURN',
        'SMALL_CONVERT',
      ])
      .optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    fromId: z.number().int().safe().finite().optional(),
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
              id: z.number().int().safe().finite(),
              tranId: z.number().int().safe().finite(),
              timestamp: z.number().int().safe().finite(),
              asset: z.string(),
              symbol: z.string(),
              type: z.string(),
              amount: z.string(),
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

export type GetSapiV1MarginCapitalFlowPayload = {
  queryParams: {
    asset?: string;
    symbol?: string;
    type?:
      | 'TRANSFER'
      | 'BORROW'
      | 'REPAY'
      | 'BUY_INCOME'
      | 'BUY_EXPENSE'
      | 'SELL_INCOME'
      | 'SELL_EXPENSE'
      | 'TRADING_COMMISSION'
      | 'BUY_LIQUIDATION'
      | 'SELL_LIQUIDATION'
      | 'REPAY_LIQUIDATION'
      | 'OTHER_LIQUIDATION'
      | 'LIQUIDATION_FEE'
      | 'SMALL_BALANCE_CONVERT'
      | 'COMMISSION_RETURN'
      | 'SMALL_CONVERT';
    startTime?: number; // int
    endTime?: number; // int
    fromId?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginCapitalFlowResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            id: number; // int
            tranId: number; // int
            timestamp: number; // int
            asset: string;
            symbol: string;
            type: string;
            amount: string;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginCapitalFlowRequestResult = RequestResult<
  Request,
  GetSapiV1MarginCapitalFlowResponse
>;

export function getSapiV1MarginCapitalFlow(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginCapitalFlowPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginCapitalFlowRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginCapitalFlowEndpointSchema,
    }),
    config
  );
}
