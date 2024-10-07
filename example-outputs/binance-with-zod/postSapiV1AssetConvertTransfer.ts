import {z_Error, Error} from '@example-outputs/binance-with-zod';
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
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostSapiV1AssetConvertTransferRequest = RequestUnion<
  any,
  any,
  {
    clientTranId: string;
    asset: string;
    amount: number;
    targetAsset: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1AssetConvertTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
          status: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetConvertTransferRequestResult = RequestResult<
  PostSapiV1AssetConvertTransferRequest,
  PostSapiV1AssetConvertTransferResponse
>;

export function postSapiV1AssetConvertTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1AssetConvertTransferRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetConvertTransferRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1AssetConvertTransferEndpointSchema, payload),
    config
  );
}
