import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1SimpleEarnLockedRedeemEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/redeem',
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

export type PostSapiV1SimpleEarnLockedRedeemPayload = {
  queryParams: {
    positionId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SimpleEarnLockedRedeemResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          redeemId: number; // int
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SimpleEarnLockedRedeemRequestResult = RequestResult<
  Request,
  PostSapiV1SimpleEarnLockedRedeemResponse
>;

export function postSapiV1SimpleEarnLockedRedeem(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SimpleEarnLockedRedeemPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnLockedRedeemRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SimpleEarnLockedRedeemEndpointSchema,
    }),
    config
  );
}
