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

export const getSapiV1GiftcardCryptographyRsaPublicKeyEndpointSchema = {
  path: '/sapi/v1/giftcard/cryptography/rsa-public-key',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
            code: z.string(),
            message: z.string(),
            data: z.string(),
            success: z.boolean(),
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

export type GetSapiV1GiftcardCryptographyRsaPublicKeyRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1GiftcardCryptographyRsaPublicKeyResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: string;
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1GiftcardCryptographyRsaPublicKeyRequestResult =
  RequestResult<
    GetSapiV1GiftcardCryptographyRsaPublicKeyRequest,
    GetSapiV1GiftcardCryptographyRsaPublicKeyResponse
  >;

export function getSapiV1GiftcardCryptographyRsaPublicKey(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1GiftcardCryptographyRsaPublicKeyRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1GiftcardCryptographyRsaPublicKeyRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1GiftcardCryptographyRsaPublicKeyEndpointSchema,
      payload
    ),
    config
  );
}
