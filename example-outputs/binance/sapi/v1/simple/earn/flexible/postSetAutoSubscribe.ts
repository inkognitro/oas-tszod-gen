import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postSetAutoSubscribeEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/setAutoSubscribe',
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

export type PostSetAutoSubscribeRequest = RequestUnion<
  any,
  any,
  {
    productId: string;
    autoSubscribe: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSetAutoSubscribeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSetAutoSubscribeRequestResult = RequestResult<
  PostSetAutoSubscribeRequest,
  PostSetAutoSubscribeResponse
>;

export function postSetAutoSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSetAutoSubscribeRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSetAutoSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(postSetAutoSubscribeEndpointSchema, payload),
    config
  );
}
