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

export const getSapiV1GiftcardCryptographyRsaPublicKeyEndpointSchema = {
  path: '/sapi/v1/giftcard/cryptography/rsa-public-key',
  method: 'get',
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
    'queryParams'
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
