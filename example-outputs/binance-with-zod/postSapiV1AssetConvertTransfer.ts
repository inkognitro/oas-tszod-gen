import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1AssetConvertTransferEndpointSchema = {
  path: '/sapi/v1/asset/convert-transfer',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    clientTranId: z.string(),
    asset: z.string(),
    amount: z.number().safe().finite(),
    targetAsset: z.string(),
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
            tranId: z.number().int().safe().finite(),
            status: z.string(),
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

export type PostSapiV1AssetConvertTransferPayload = {
  queryParams: {
    clientTranId: string;
    asset: string;
    amount: number;
    targetAsset: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AssetConvertTransferResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
          status: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetConvertTransferRequestResult = RequestResult<
  Request,
  PostSapiV1AssetConvertTransferResponse
>;

export function postSapiV1AssetConvertTransfer(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1AssetConvertTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetConvertTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AssetConvertTransferEndpointSchema,
    }),
    config
  );
}
