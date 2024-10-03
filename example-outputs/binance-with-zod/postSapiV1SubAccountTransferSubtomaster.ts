import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1SubAccountTransferSubtomasterEndpointSchema = {
  path: '/sapi/v1/sub-account/transfer/subToMaster',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string(),
    amount: z.number().safe().finite(),
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
            txnId: z.string(),
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

export type PostSapiV1SubAccountTransferSubtomasterRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SubAccountTransferSubtomasterResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          txnId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountTransferSubtomasterRequestResult =
  RequestResult<
    PostSapiV1SubAccountTransferSubtomasterRequest,
    PostSapiV1SubAccountTransferSubtomasterResponse
  >;

export function postSapiV1SubAccountTransferSubtomaster(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SubAccountTransferSubtomasterRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountTransferSubtomasterRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1SubAccountTransferSubtomasterEndpointSchema,
      payload
    ),
    config
  );
}
