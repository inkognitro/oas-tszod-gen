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
} from './core';
import {Climate_Order} from './climate';
import {Error} from './schemas';

export const getClimateOrdersOrderEndpointSchema = {
  path: '/v1/climate/orders/{order}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetClimateOrdersOrderRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    order: string;
  },
  {
    expand?: string[];
  }
>;

export type GetClimateOrdersOrderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Climate_Order>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetClimateOrdersOrderRequestResult = RequestResult<
  GetClimateOrdersOrderRequest,
  GetClimateOrdersOrderResponse
>;

export function getClimateOrdersOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetClimateOrdersOrderRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetClimateOrdersOrderRequestResult> {
  return requestHandler.execute(
    createRequest(getClimateOrdersOrderEndpointSchema, payload),
    config
  );
}
