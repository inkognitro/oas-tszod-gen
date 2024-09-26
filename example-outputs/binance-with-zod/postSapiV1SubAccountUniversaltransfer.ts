import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1SubAccountUniversaltransferEndpointSchema = {
  path: '/sapi/v1/sub-account/universalTransfer',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    fromEmail: z.string().optional(),
    toEmail: z.string().optional(),
    fromAccountType: z.enum([
      'SPOT',
      'USDT_FUTURE',
      'COIN_FUTURE',
      'MARGIN',
      'ISOLATED_MARGIN',
    ]),
    toAccountType: z.enum([
      'SPOT',
      'USDT_FUTURE',
      'COIN_FUTURE',
      'MARGIN',
      'ISOLATED_MARGIN',
    ]),
    clientTranId: z.string().optional(),
    symbol: z.string().optional(),
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
            tranId: z.number().int().safe().finite(),
            clientTranId: z.string(),
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

export type PostSapiV1SubAccountUniversaltransferPayload = {
  queryParams: {
    fromEmail?: string;
    toEmail?: string;
    fromAccountType:
      | 'SPOT'
      | 'USDT_FUTURE'
      | 'COIN_FUTURE'
      | 'MARGIN'
      | 'ISOLATED_MARGIN';
    toAccountType:
      | 'SPOT'
      | 'USDT_FUTURE'
      | 'COIN_FUTURE'
      | 'MARGIN'
      | 'ISOLATED_MARGIN';
    clientTranId?: string;
    symbol?: string;
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SubAccountUniversaltransferResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            tranId: number; // int
            clientTranId: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1SubAccountUniversaltransferRequestResult = RequestResult<
  Request,
  PostSapiV1SubAccountUniversaltransferResponse
>;

export function postSapiV1SubAccountUniversaltransfer(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SubAccountUniversaltransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountUniversaltransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountUniversaltransferEndpointSchema,
    }),
    config
  );
}
