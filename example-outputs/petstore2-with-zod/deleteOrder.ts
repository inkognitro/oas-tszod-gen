import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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

export type DeleteOrderPayload = {
  pathParams: {
    orderId: number; // int
  };
};

export type DeleteOrderResponse = Response<400> | Response<404>;

export type DeleteOrderRequestResult = RequestResult<
  Request,
  DeleteOrderResponse
>;

export function deleteOrder(
  requestHandler: SimpleRequestHandler,
  payload: DeleteOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteOrderRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: deleteOrderEndpointSchema}),
    config
  );
}
