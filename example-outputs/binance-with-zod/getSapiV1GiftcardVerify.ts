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

export const getSapiV1GiftcardVerifyEndpointSchema = {
  path: '/sapi/v1/giftcard/verify',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    referenceNo: z.string(),
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
            data: z.object({
              valid: z.boolean(),
              token: z.string(),
              amount: z.string(),
            }),
            success: z.boolean(),
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
