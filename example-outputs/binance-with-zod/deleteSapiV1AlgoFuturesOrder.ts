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

export const deleteSapiV1AlgoFuturesOrderEndpointSchema = {
  path: '/sapi/v1/algo/futures/order',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    algoId: z.number().int().safe().finite(),
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
            algoId: z.number().int().safe().finite(),
            success: z.boolean(),
            code: z.number().int().safe().finite(),
            msg: z.string(),
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

export type DeleteSapiV1AlgoFuturesOrderRequest = RequestUnion<
  any,
  any,
  {
    algoId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteSapiV1AlgoFuturesOrderResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          algoId: number; // int
          success: boolean;
          code: number; // int
          msg: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1AlgoFuturesOrderRequestResult = RequestResult<
  DeleteSapiV1AlgoFuturesOrderRequest,
  DeleteSapiV1AlgoFuturesOrderResponse
>;

export function deleteSapiV1AlgoFuturesOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteSapiV1AlgoFuturesOrderRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1AlgoFuturesOrderRequestResult> {
  return requestHandler.execute(
    createRequest(deleteSapiV1AlgoFuturesOrderEndpointSchema, payload),
    config
  );
}
