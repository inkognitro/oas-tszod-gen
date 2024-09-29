import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type PostSapiV1BlvtSubscribePayload = {
  queryParams: {
    tokenName: string;
    cost: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1BlvtSubscribeResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1BlvtSubscribeRequestResult = RequestResult<
  Request,
  PostSapiV1BlvtSubscribeResponse
>;

export function postSapiV1BlvtSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1BlvtSubscribePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1BlvtSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1BlvtSubscribeEndpointSchema,
    }),
    config
  );
}
