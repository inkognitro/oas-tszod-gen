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

export type PostSapiV1BlvtRedeemRequest = RequestUnion<
  any,
  any,
  {
    tokenName: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1BlvtRedeemResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1BlvtRedeemRequestResult = RequestResult<
  PostSapiV1BlvtRedeemRequest,
  PostSapiV1BlvtRedeemResponse
>;

export function postSapiV1BlvtRedeem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1BlvtRedeemRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1BlvtRedeemRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1BlvtRedeemEndpointSchema, payload),
    config
  );
}
