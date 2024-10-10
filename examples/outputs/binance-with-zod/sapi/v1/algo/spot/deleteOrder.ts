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

export const deleteOrderEndpointSchema = {
  path: '/sapi/v1/algo/spot/order',
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

export type DeleteOrderRequest = RequestUnion<
  any,
  any,
  {
    algoId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteOrderResponse =
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

export type DeleteOrderRequestResult = RequestResult<
  DeleteOrderRequest,
  DeleteOrderResponse
>;

export function deleteOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteOrderRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteOrderRequestResult> {
  return requestHandler.execute(
    createRequest(deleteOrderEndpointSchema, payload),
    config
  );
}
