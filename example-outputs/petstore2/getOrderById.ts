import {Order} from '@example-outputs/petstore2';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

export const getOrderByIdEndpointSchema = {
  path: '/store/order/{orderId}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/xml': {},
        'application/json': {},
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
      | ResponseBodyData<'application/xml', Order>
      | ResponseBodyData<'application/json', Order>
    >
  | Response<400>
  | Response<404>;

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
