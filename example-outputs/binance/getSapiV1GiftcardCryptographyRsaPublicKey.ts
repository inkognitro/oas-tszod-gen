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

export const getSapiV1GiftcardCryptographyRsaPublicKeyEndpointSchema = {
  path: '/sapi/v1/giftcard/cryptography/rsa-public-key',
  method: 'get',
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

export type GetSapiV1GiftcardCryptographyRsaPublicKeyPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1GiftcardCryptographyRsaPublicKeyResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1GiftcardCryptographyRsaPublicKeyRequestResult =
  RequestResult<Request, GetSapiV1GiftcardCryptographyRsaPublicKeyResponse>;

export function getSapiV1GiftcardCryptographyRsaPublicKey(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1GiftcardCryptographyRsaPublicKeyPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1GiftcardCryptographyRsaPublicKeyRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1GiftcardCryptographyRsaPublicKeyEndpointSchema,
    }),
    config
  );
}
