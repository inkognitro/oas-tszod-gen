import {z_Order, Order} from '@example-outputs/petstore2-with-zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  Response,
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
      zodSchema: z_Order,
    },
    'application/xml': {
      zodSchema: z_Order,
    },
    'application/x-www-form-urlencoded': {
      zodSchema: z_Order,
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Order,
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
  | Response<405>;

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
