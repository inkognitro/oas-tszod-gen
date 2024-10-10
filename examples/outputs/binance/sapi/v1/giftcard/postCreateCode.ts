import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';
import {Error} from '../../../';

export const postCreateCodeEndpointSchema = {
  path: '/sapi/v1/giftcard/createCode',
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

export type PostCreateCodeRequest = RequestUnion<
  any,
  any,
  {
    token: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostCreateCodeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            referenceNo: string;
            code: string;
            expiredTime: number; // int
          };
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostCreateCodeRequestResult = RequestResult<
  PostCreateCodeRequest,
  PostCreateCodeResponse
>;

export function postCreateCode(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostCreateCodeRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostCreateCodeRequestResult> {
  return requestHandler.execute(
    createRequest(postCreateCodeEndpointSchema, payload),
    config
  );
}
