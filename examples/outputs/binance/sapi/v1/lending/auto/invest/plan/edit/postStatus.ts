import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../../../core';
import {Error} from '../../../../../../../';

export const postStatusEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/edit-status',
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

export type PostStatusRequest = RequestUnion<
  any,
  any,
  {
    planId: number; // int
    status: 'ONGOING' | 'PAUSED' | 'REMOVED';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostStatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          planId: number; // int
          nextExecutionDateTime: number; // int
          status: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostStatusRequestResult = RequestResult<
  PostStatusRequest,
  PostStatusResponse
>;

export function postStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostStatusRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostStatusRequestResult> {
  return requestHandler.execute(
    createRequest(postStatusEndpointSchema, payload),
    config
  );
}
