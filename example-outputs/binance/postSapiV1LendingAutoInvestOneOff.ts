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

export const postSapiV1LendingAutoInvestOneOffEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/one-off',
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

export type PostSapiV1LendingAutoInvestOneOffRequest = RequestUnion<
  any,
  any,
  {
    sourceType: string;
    requestId?: string;
    subscriptionAmount: number;
    sourceAsset: string;
    flexibleAllowedToUse?: boolean;
    planId?: number; // int
    indexId?: number; // int
    details?: {
      targetAsset?: string;
      percentage?: number; // int
    }[];
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LendingAutoInvestOneOffResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          transactionId: number; // int
          waitSecond: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LendingAutoInvestOneOffRequestResult = RequestResult<
  PostSapiV1LendingAutoInvestOneOffRequest,
  PostSapiV1LendingAutoInvestOneOffResponse
>;

export function postSapiV1LendingAutoInvestOneOff(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1LendingAutoInvestOneOffRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingAutoInvestOneOffRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LendingAutoInvestOneOffEndpointSchema, payload),
    config
  );
}
