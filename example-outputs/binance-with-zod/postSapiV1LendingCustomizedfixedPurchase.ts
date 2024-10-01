import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LendingCustomizedfixedPurchaseEndpointSchema = {
  path: '/sapi/v1/lending/customizedFixed/purchase',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    projectId: z.string(),
    lot: z.string(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            purchaseId: z.string(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
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
