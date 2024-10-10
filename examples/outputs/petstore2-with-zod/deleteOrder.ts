import {z} from 'zod';
import {
  RequestUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';

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

export type DeleteOrderResponse = Response<400> | Response<404>;

export type DeleteOrderRequestResult = RequestResult<
  DeleteOrderRequest,
  DeleteOrderResponse
>;

export function deleteOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteOrderRequest, 'pathParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteOrderRequestResult> {
  return requestHandler.execute(
    createRequest(deleteOrderEndpointSchema, payload),
    config
  );
}
