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

export const postSapiV1LendingAutoInvestRedeemEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/redeem',
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

export type PostSapiV1LendingAutoInvestRedeemPayload = {
  queryParams: {
    indexId: number; // int
    requestId?: string;
    redemptionPercentage: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LendingAutoInvestRedeemResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          redemptionId: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LendingAutoInvestRedeemRequestResult = RequestResult<
  Request,
  PostSapiV1LendingAutoInvestRedeemResponse
>;

export function postSapiV1LendingAutoInvestRedeem(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LendingAutoInvestRedeemPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingAutoInvestRedeemRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LendingAutoInvestRedeemEndpointSchema,
    }),
    config
  );
}
