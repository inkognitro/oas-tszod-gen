import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';
import {Order} from './schemas';

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
  | Response<400>
  | Response<404>;

export type GetOrderByIdRequestResult = RequestResult<
  GetOrderByIdRequest,
  GetOrderByIdResponse
>;

export function getOrderById(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetOrderByIdRequest, 'pathParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetOrderByIdRequestResult> {
  return requestHandler.execute(
    createRequest(getOrderByIdEndpointSchema, payload),
    config
  );
}
