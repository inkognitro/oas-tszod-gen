import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const getFlowEndpointSchema = {
  path: '/sapi/v1/margin/capital-flow',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type GetFlowRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetFlowResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetFlowRequestResult = RequestResult<
  GetFlowRequest,
  GetFlowResponse
>;

export function getFlow(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetFlowRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetFlowRequestResult> {
  return requestHandler.execute(
    createRequest(getFlowEndpointSchema, payload),
    config
  );
}
