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

export const postSapiV1BlvtRedeemEndpointSchema = {
  path: '/sapi/v1/blvt/redeem',
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

export type PostSapiV1BlvtRedeemPayload = {
  queryParams: {
    tokenName: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1BlvtRedeemResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          id: number; // int
          status: string;
          tokenName: string;
          redeemAmount: string;
          amount: string;
          timestamp: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1BlvtRedeemRequestResult = RequestResult<
  Request,
  PostSapiV1BlvtRedeemResponse
>;

export function postSapiV1BlvtRedeem(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1BlvtRedeemPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1BlvtRedeemRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1BlvtRedeemEndpointSchema,
    }),
    config
  );
}
