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

export const deleteSapiV1AlgoSpotOrderEndpointSchema = {
  path: '/sapi/v1/algo/spot/order',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type DeleteSapiV1AlgoSpotOrderPayload = {
  queryParams: {
    algoId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteSapiV1AlgoSpotOrderResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type DeleteSapiV1AlgoSpotOrderRequestResult = RequestResult<
  Request,
  DeleteSapiV1AlgoSpotOrderResponse
>;

export function deleteSapiV1AlgoSpotOrder(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1AlgoSpotOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1AlgoSpotOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1AlgoSpotOrderEndpointSchema,
    }),
    config
  );
}
