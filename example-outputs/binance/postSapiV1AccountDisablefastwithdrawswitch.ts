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

export const postSapiV1AccountDisablefastwithdrawswitchEndpointSchema = {
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

export type PostSapiV1AccountDisablefastwithdrawswitchPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AccountDisablefastwithdrawswitchResponse =
  | Response<200, ResponseBodyData<'application/json', {}>>
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AccountDisablefastwithdrawswitchRequestResult =
  RequestResult<Request, PostSapiV1AccountDisablefastwithdrawswitchResponse>;

export function postSapiV1AccountDisablefastwithdrawswitch(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1AccountDisablefastwithdrawswitchPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AccountDisablefastwithdrawswitchRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AccountDisablefastwithdrawswitchEndpointSchema,
    }),
    config
  );
}
