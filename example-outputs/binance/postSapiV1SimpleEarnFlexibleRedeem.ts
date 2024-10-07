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

export const postSapiV1SimpleEarnFlexibleRedeemEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/redeem',
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

export type PostSapiV1SimpleEarnFlexibleRedeemRequest = RequestUnion<
  any,
  any,
  {
    productId: string;
    redeemAll?: boolean;
    amount?: number;
    destAccount?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SimpleEarnFlexibleRedeemResponse =
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

export type PostSapiV1SimpleEarnFlexibleRedeemRequestResult = RequestResult<
  PostSapiV1SimpleEarnFlexibleRedeemRequest,
  PostSapiV1SimpleEarnFlexibleRedeemResponse
>;

export function postSapiV1SimpleEarnFlexibleRedeem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SimpleEarnFlexibleRedeemRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnFlexibleRedeemRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SimpleEarnFlexibleRedeemEndpointSchema, payload),
    config
  );
}
