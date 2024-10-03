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

export const getSapiV1GiftcardVerifyEndpointSchema = {
  path: '/sapi/v1/giftcard/verify',
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

export type GetSapiV1GiftcardVerifyRequest = RequestUnion<
  any,
  any,
  {
    referenceNo: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1GiftcardVerifyResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            valid: boolean;
            token: string;
            amount: string;
          };
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1GiftcardVerifyRequestResult = RequestResult<
  GetSapiV1GiftcardVerifyRequest,
  GetSapiV1GiftcardVerifyResponse
>;

export function getSapiV1GiftcardVerify(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1GiftcardVerifyRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1GiftcardVerifyRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1GiftcardVerifyEndpointSchema, payload),
    config
  );
}
