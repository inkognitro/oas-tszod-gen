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

export const postSapiV1BlvtSubscribeEndpointSchema = {
  path: '/sapi/v1/blvt/subscribe',
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

export type PostSapiV1BlvtSubscribeRequest = RequestUnion<
  any,
  any,
  {
    tokenName: string;
    cost: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1BlvtSubscribeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          id: number; // int
          status: string;
          tokenName: string;
          amount: string;
          cost: string;
          timestamp: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1BlvtSubscribeRequestResult = RequestResult<
  PostSapiV1BlvtSubscribeRequest,
  PostSapiV1BlvtSubscribeResponse
>;

export function postSapiV1BlvtSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1BlvtSubscribeRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1BlvtSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1BlvtSubscribeEndpointSchema, payload),
    config
  );
}
