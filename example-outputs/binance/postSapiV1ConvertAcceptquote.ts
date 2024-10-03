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

export const postSapiV1ConvertAcceptquoteEndpointSchema = {
  path: '/sapi/v1/convert/acceptQuote',
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

export type PostSapiV1ConvertAcceptquoteRequest = RequestUnion<
  any,
  any,
  {
    quoteId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1ConvertAcceptquoteResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderId: string;
          createTime: number; // int
          orderStatus: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1ConvertAcceptquoteRequestResult = RequestResult<
  PostSapiV1ConvertAcceptquoteRequest,
  PostSapiV1ConvertAcceptquoteResponse
>;

export function postSapiV1ConvertAcceptquote(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1ConvertAcceptquoteRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ConvertAcceptquoteRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1ConvertAcceptquoteEndpointSchema, payload),
    config
  );
}
