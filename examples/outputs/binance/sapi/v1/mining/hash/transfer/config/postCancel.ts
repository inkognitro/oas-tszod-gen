import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../../core';
import {Error} from '../../../../../../';

export const postCancelEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/config/cancel',
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

export type PostCancelRequest = RequestUnion<
  any,
  any,
  {
    configId: string;
    userName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostCancelResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostCancelRequestResult = RequestResult<
  PostCancelRequest,
  PostCancelResponse
>;

export function postCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostCancelRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postCancelEndpointSchema, payload),
    config
  );
}
