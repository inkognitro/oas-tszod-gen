import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginForceliquidationrecEndpointSchema = {
  path: '/sapi/v1/margin/forceLiquidationRec',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1MarginForceliquidationrecPayload = {
  queryParams: {
    startTime?: number; // int
    endTime?: number; // int
    isolatedSymbol?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginForceliquidationrecResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginForceliquidationrecRequestResult = RequestResult<
  Request,
  GetSapiV1MarginForceliquidationrecResponse
>;

export function getSapiV1MarginForceliquidationrec(
  requestHandler: RequestHandler,
  payload: GetSapiV1MarginForceliquidationrecPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginForceliquidationrecRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginForceliquidationrecEndpointSchema,
    }),
    config
  );
}
