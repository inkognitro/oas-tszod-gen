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

export type PostSapiV1AccountDisablefastwithdrawswitchRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1AccountDisablefastwithdrawswitchResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AccountDisablefastwithdrawswitchRequestResult =
  RequestResult<
    PostSapiV1AccountDisablefastwithdrawswitchRequest,
    PostSapiV1AccountDisablefastwithdrawswitchResponse
  >;

export function postSapiV1AccountDisablefastwithdrawswitch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1AccountDisablefastwithdrawswitchRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AccountDisablefastwithdrawswitchRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1AccountDisablefastwithdrawswitchEndpointSchema,
      payload
    ),
    config
  );
}
