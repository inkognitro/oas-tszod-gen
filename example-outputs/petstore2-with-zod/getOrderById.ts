import {orderZodSchema, Order} from '@example-outputs/petstore2-with-zod';
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

export const getOrderByIdEndpointSchema = {
  path: '/store/order/{orderId}',
  method: 'get',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/xml': {
          zodSchema: orderZodSchema,
        },
        'application/json': {
          zodSchema: orderZodSchema,
        },
      },
    },
    '400': {
      bodyByContentType: {},
    },
    '404': {
      bodyByContentType: {},
    },
  },
};

export type GetOrderByIdRequest = RequestUnion<
  any,
  {
    orderId: number; // int
  }
>;

export type GetOrderByIdResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', Order>
      | ResponseBodyData<'application/json', Order>
    >
  | ResponseUnion<400>
  | ResponseUnion<404>;

export type GetOrderByIdRequestResult = RequestResult<
  GetOrderByIdRequest,
  GetOrderByIdResponse
>;

export function getOrderById(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetOrderByIdRequest, 'pathParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetOrderByIdRequestResult> {
  return requestHandler.execute(
    createRequest(getOrderByIdEndpointSchema, payload),
    config
  );
}
