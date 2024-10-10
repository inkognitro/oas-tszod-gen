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

export const postConfigEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/config',
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

export type PostConfigRequest = RequestUnion<
  any,
  any,
  {
    userName: string;
    algo: string;
    startDate?: string;
    endDate?: string;
    toPoolUser: string;
    hashRate: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostConfigResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostConfigRequestResult = RequestResult<
  PostConfigRequest,
  PostConfigResponse
>;

export function postConfig(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostConfigRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostConfigRequestResult> {
  return requestHandler.execute(
    createRequest(postConfigEndpointSchema, payload),
    config
  );
}
