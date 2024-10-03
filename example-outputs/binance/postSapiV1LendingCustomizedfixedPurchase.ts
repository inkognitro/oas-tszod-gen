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

export const postSapiV1LendingCustomizedfixedPurchaseEndpointSchema = {
  path: '/sapi/v1/lending/customizedFixed/purchase',
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

export type PostSapiV1LendingCustomizedfixedPurchaseRequest = RequestUnion<
  any,
  any,
  {
    projectId: string;
    lot: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LendingCustomizedfixedPurchaseResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          purchaseId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LendingCustomizedfixedPurchaseRequestResult =
  RequestResult<
    PostSapiV1LendingCustomizedfixedPurchaseRequest,
    PostSapiV1LendingCustomizedfixedPurchaseResponse
  >;

export function postSapiV1LendingCustomizedfixedPurchase(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1LendingCustomizedfixedPurchaseRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingCustomizedfixedPurchaseRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1LendingCustomizedfixedPurchaseEndpointSchema,
      payload
    ),
    config
  );
}
