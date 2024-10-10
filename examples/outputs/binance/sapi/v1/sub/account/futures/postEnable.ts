import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../core';
import {Error} from '../../../../../';

export const postEnableEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/enable',
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

export type PostEnableRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostEnableResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          isFuturesEnabled: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostEnableRequestResult = RequestResult<
  PostEnableRequest,
  PostEnableResponse
>;

export function postEnable(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostEnableRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostEnableRequestResult> {
  return requestHandler.execute(
    createRequest(postEnableEndpointSchema, payload),
    config
  );
}
