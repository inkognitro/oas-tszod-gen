import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1ConvertAcceptquoteEndpointSchema = {
  path: '/sapi/v1/convert/acceptQuote',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV1ConvertAcceptquotePayload = {
  queryParams: {
    quoteId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1ConvertAcceptquoteResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            orderId: string;
            createTime: number; // int
            orderStatus: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1ConvertAcceptquoteRequestResult = RequestResult<
  Request,
  PostSapiV1ConvertAcceptquoteResponse
>;

export function postSapiV1ConvertAcceptquote(
  requestHandler: RequestHandler,
  payload: PostSapiV1ConvertAcceptquotePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ConvertAcceptquoteRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1ConvertAcceptquoteEndpointSchema,
    }),
    config
  );
}
