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
} from '@example-outputs/petstore2-with-zod/core';

export const deleteOrderEndpointSchema = {
  path: '/store/order/{orderId}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '400': {
      bodyByContentType: {},
    },
    '404': {
      bodyByContentType: {},
    },
  },
};

export type DeleteOrderRequest = RequestUnion<
  any,
  {
    orderId: number; // int
  }
>;

export type DeleteOrderResponse = ResponseUnion<400> | ResponseUnion<404>;

export type DeleteOrderRequestResult = RequestResult<
  DeleteOrderRequest,
  DeleteOrderResponse
>;

export function deleteOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteOrderRequest, 'pathParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteOrderRequestResult> {
  return requestHandler.execute(
    createRequest(deleteOrderEndpointSchema, payload),
    config
  );
}
