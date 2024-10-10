import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';
import {Error} from '../../../../';

export const postCancelOrderEndpointSchema = {
  path: '/sapi/v1/convert/limit/cancelOrder',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostCancelOrderRequest = RequestUnion<
  any,
  any,
  {
    orderId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostCancelOrderResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderId: number; // int
          status: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostCancelOrderRequestResult = RequestResult<
  PostCancelOrderRequest,
  PostCancelOrderResponse
>;

export function postCancelOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostCancelOrderRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostCancelOrderRequestResult> {
  return requestHandler.execute(
    createRequest(postCancelOrderEndpointSchema, payload),
    config
  );
}
