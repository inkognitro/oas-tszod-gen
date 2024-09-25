import {orderZodSchema, Order} from '@example-outputs/petstore2-with-zod';
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

export type GetOrderByIdPayload = {
  pathParams: {
    orderId: number; // int
  };
};

export type GetOrderByIdResponse =
  | Response<
      200,
      ResponseData<
        | ResponseBodyData<'application/xml', Order>
        | ResponseBodyData<'application/json', Order>
      >
    >
  | Response<400, any>
  | Response<404, any>;

export type GetOrderByIdRequestResult = RequestResult<
  Request,
  GetOrderByIdResponse
>;

export function getOrderById(
  requestHandler: SimpleRequestHandler,
  payload: GetOrderByIdPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetOrderByIdRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getOrderByIdEndpointSchema}),
    config
  );
}
