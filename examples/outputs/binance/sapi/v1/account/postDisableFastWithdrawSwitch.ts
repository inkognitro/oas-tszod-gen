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

export const postDisableFastWithdrawSwitchEndpointSchema = {
  path: '/sapi/v1/account/disableFastWithdrawSwitch',
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

export type PostDisableFastWithdrawSwitchRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostDisableFastWithdrawSwitchResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostDisableFastWithdrawSwitchRequestResult = RequestResult<
  PostDisableFastWithdrawSwitchRequest,
  PostDisableFastWithdrawSwitchResponse
>;

export function postDisableFastWithdrawSwitch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostDisableFastWithdrawSwitchRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostDisableFastWithdrawSwitchRequestResult> {
  return requestHandler.execute(
    createRequest(postDisableFastWithdrawSwitchEndpointSchema, payload),
    config
  );
}
