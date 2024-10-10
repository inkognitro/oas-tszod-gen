import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const getForceLiquidationRecEndpointSchema = {
  path: '/sapi/v1/margin/forceLiquidationRec',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    isolatedSymbol: z.string().optional(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
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
                avgPrice: z.string(),
                executedQty: z.string(),
                orderId: z.number().int().safe().finite(),
                price: z.string(),
                qty: z.string(),
                side: z.string(),
                symbol: z.string(),
                timeInForce: z.string(),
                isIsolated: z.boolean(),
                updatedTime: z.number().int().safe().finite(),
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

export type GetForceLiquidationRecRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    isolatedSymbol?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetForceLiquidationRecResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            avgPrice: string;
            executedQty: string;
            orderId: number; // int
            price: string;
            qty: string;
            side: string;
            symbol: string;
            timeInForce: string;
            isIsolated: boolean;
            updatedTime: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetForceLiquidationRecRequestResult = RequestResult<
  GetForceLiquidationRecRequest,
  GetForceLiquidationRecResponse
>;

export function getForceLiquidationRec(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetForceLiquidationRecRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetForceLiquidationRecRequestResult> {
  return requestHandler.execute(
    createRequest(getForceLiquidationRecEndpointSchema, payload),
    config
  );
}
