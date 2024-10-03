import {orderZodSchema, Order} from '@example-outputs/petstore2-with-zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore2-with-zod/core';

export const placeOrderEndpointSchema = {
  path: '/store/order',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/json': {
      zodSchema: orderZodSchema,
    },
    'application/xml': {
      zodSchema: orderZodSchema,
    },
    'application/x-www-form-urlencoded': {
      zodSchema: orderZodSchema,
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: orderZodSchema,
        },
      },
    },
    '405': {
      bodyByContentType: {},
    },
  },
};

export type PlaceOrderRequest = RequestUnion<
  | RequestBodyData<'application/json', Order>
  | RequestBodyData<'application/xml', Order>
  | RequestBodyData<'application/x-www-form-urlencoded', Order>
>;

export type PlaceOrderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Order>>
  | ResponseUnion<405>;

export type PlaceOrderRequestResult = RequestResult<
  PlaceOrderRequest,
  PlaceOrderResponse
>;

export function placeOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PlaceOrderRequest, 'contentType' | 'body'>,
  config?: RequestHandlerExecutionConfig
): Promise<PlaceOrderRequestResult> {
  return requestHandler.execute(
    createRequest(placeOrderEndpointSchema, payload),
    config
  );
}
