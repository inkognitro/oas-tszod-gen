import {Order} from '@example-outputs/petstore2';
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
} from '@example-outputs/petstore2/core';

export const placeOrderEndpointSchema = {
  path: '/store/order',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/json': {},
    'application/xml': {},
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
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
