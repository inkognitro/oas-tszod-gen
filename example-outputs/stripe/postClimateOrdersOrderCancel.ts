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
} from '@example-outputs/stripe/core';
import {Climate_Order, Error} from '@example-outputs/stripe';

export const postClimateOrdersOrderCancelEndpointSchema = {
  path: '/v1/climate/orders/{order}/cancel',
  method: 'post',
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

export type PostClimateOrdersOrderCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    order: string;
  }
>;

export type PostClimateOrdersOrderCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Climate_Order>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostClimateOrdersOrderCancelRequestResult = RequestResult<
  PostClimateOrdersOrderCancelRequest,
  PostClimateOrdersOrderCancelResponse
>;

export function postClimateOrdersOrderCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostClimateOrdersOrderCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostClimateOrdersOrderCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postClimateOrdersOrderCancelEndpointSchema, payload),
    config
  );
}
