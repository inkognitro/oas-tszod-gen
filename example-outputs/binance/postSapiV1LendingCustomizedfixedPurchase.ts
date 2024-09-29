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

export const postSapiV1LendingCustomizedfixedPurchaseEndpointSchema = {
  path: '/sapi/v1/lending/customizedFixed/purchase',
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

export type PostSapiV1LendingCustomizedfixedPurchasePayload = {
  queryParams: {
    projectId: string;
    lot: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LendingCustomizedfixedPurchaseResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          purchaseId: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LendingCustomizedfixedPurchaseRequestResult =
  RequestResult<Request, PostSapiV1LendingCustomizedfixedPurchaseResponse>;

export function postSapiV1LendingCustomizedfixedPurchase(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LendingCustomizedfixedPurchasePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingCustomizedfixedPurchaseRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LendingCustomizedfixedPurchaseEndpointSchema,
    }),
    config
  );
}
