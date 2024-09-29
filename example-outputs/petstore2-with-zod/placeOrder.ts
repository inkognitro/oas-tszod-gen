import {orderZodSchema, Order} from '@example-outputs/petstore2-with-zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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

export type PlaceOrderRequestBody =
  | {
      contentType: 'application/json';
      body: Order;
    }
  | {
      contentType: 'application/xml';
      body: Order;
    }
  | {
      contentType: 'application/x-www-form-urlencoded';
      body: Order;
    };

export type PlaceOrderPayload = PlaceOrderRequestBody;

export type PlaceOrderResponse =
  | Response<200, ResponseBodyData<'application/json', Order>>
  | Response<405>;

export type PlaceOrderRequestResult = RequestResult<
  Request,
  PlaceOrderResponse
>;

export function placeOrder(
  requestHandler: SimpleRequestHandler,
  payload: PlaceOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PlaceOrderRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: placeOrderEndpointSchema}),
    config
  );
}
