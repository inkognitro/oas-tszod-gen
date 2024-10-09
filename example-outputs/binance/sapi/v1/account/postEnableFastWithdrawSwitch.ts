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

export const postEnableFastWithdrawSwitchEndpointSchema = {
  path: '/sapi/v1/account/enableFastWithdrawSwitch',
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

export type PostEnableFastWithdrawSwitchRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostEnableFastWithdrawSwitchResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostEnableFastWithdrawSwitchRequestResult = RequestResult<
  PostEnableFastWithdrawSwitchRequest,
  PostEnableFastWithdrawSwitchResponse
>;

export function postEnableFastWithdrawSwitch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostEnableFastWithdrawSwitchRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostEnableFastWithdrawSwitchRequestResult> {
  return requestHandler.execute(
    createRequest(postEnableFastWithdrawSwitchEndpointSchema, payload),
    config
  );
}
