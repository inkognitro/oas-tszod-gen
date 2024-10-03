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

export type PostSapiV1LendingAutoInvestRedeemRequest = RequestUnion<
  any,
  any,
  {
    indexId: number; // int
    requestId?: string;
    redemptionPercentage: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LendingAutoInvestRedeemResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          redemptionId: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LendingAutoInvestRedeemRequestResult = RequestResult<
  PostSapiV1LendingAutoInvestRedeemRequest,
  PostSapiV1LendingAutoInvestRedeemResponse
>;

export function postSapiV1LendingAutoInvestRedeem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1LendingAutoInvestRedeemRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingAutoInvestRedeemRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LendingAutoInvestRedeemEndpointSchema, payload),
    config
  );
}
