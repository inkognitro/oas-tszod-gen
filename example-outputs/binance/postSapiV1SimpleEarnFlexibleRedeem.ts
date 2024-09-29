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

export const postSapiV1SimpleEarnFlexibleRedeemEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/redeem',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV1SimpleEarnFlexibleRedeemPayload = {
  queryParams: {
    productId: string;
    redeemAll?: boolean;
    amount?: number;
    destAccount?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SimpleEarnFlexibleRedeemResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          redeemId: number; // int
          success: boolean;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SimpleEarnFlexibleRedeemRequestResult = RequestResult<
  Request,
  PostSapiV1SimpleEarnFlexibleRedeemResponse
>;

export function postSapiV1SimpleEarnFlexibleRedeem(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SimpleEarnFlexibleRedeemPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnFlexibleRedeemRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SimpleEarnFlexibleRedeemEndpointSchema,
    }),
    config
  );
}
