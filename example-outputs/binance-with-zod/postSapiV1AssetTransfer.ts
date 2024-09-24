import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1AssetTransferEndpointSchema = {
  path: '/sapi/v1/asset/transfer',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    type: z.union([
      z.literal('MAIN_C2C'),
      z.literal('MAIN_UMFUTURE'),
      z.literal('MAIN_CMFUTURE'),
      z.literal('MAIN_MARGIN'),
      z.literal('MAIN_MINING'),
      z.literal('C2C_MAIN'),
      z.literal('C2C_UMFUTURE'),
      z.literal('C2C_MINING'),
      z.literal('C2C_MARGIN'),
      z.literal('UMFUTURE_MAIN'),
      z.literal('UMFUTURE_C2C'),
      z.literal('UMFUTURE_MARGIN'),
      z.literal('CMFUTURE_MAIN'),
      z.literal('CMFUTURE_MARGIN'),
      z.literal('MARGIN_MAIN'),
      z.literal('MARGIN_UMFUTURE'),
      z.literal('MARGIN_CMFUTURE'),
      z.literal('MARGIN_MINING'),
      z.literal('MARGIN_C2C'),
      z.literal('MINING_MAIN'),
      z.literal('MINING_UMFUTURE'),
      z.literal('MINING_C2C'),
      z.literal('MINING_MARGIN'),
      z.literal('MAIN_PAY'),
      z.literal('PAY_MAIN'),
      z.literal('ISOLATEDMARGIN_MARGIN'),
      z.literal('MARGIN_ISOLATEDMARGIN'),
      z.literal('ISOLATEDMARGIN_ISOLATEDMARGIN'),
    ]),
    asset: z.string(),
    amount: z.number().safe().finite(),
    fromSymbol: z.string().optional(),
    toSymbol: z.string().optional(),
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

export type PostSapiV1AssetTransferPayload = {
  queryParams: {
    type:
      | 'MAIN_C2C'
      | 'MAIN_UMFUTURE'
      | 'MAIN_CMFUTURE'
      | 'MAIN_MARGIN'
      | 'MAIN_MINING'
      | 'C2C_MAIN'
      | 'C2C_UMFUTURE'
      | 'C2C_MINING'
      | 'C2C_MARGIN'
      | 'UMFUTURE_MAIN'
      | 'UMFUTURE_C2C'
      | 'UMFUTURE_MARGIN'
      | 'CMFUTURE_MAIN'
      | 'CMFUTURE_MARGIN'
      | 'MARGIN_MAIN'
      | 'MARGIN_UMFUTURE'
      | 'MARGIN_CMFUTURE'
      | 'MARGIN_MINING'
      | 'MARGIN_C2C'
      | 'MINING_MAIN'
      | 'MINING_UMFUTURE'
      | 'MINING_C2C'
      | 'MINING_MARGIN'
      | 'MAIN_PAY'
      | 'PAY_MAIN'
      | 'ISOLATEDMARGIN_MARGIN'
      | 'MARGIN_ISOLATEDMARGIN'
      | 'ISOLATEDMARGIN_ISOLATEDMARGIN';
    asset: string;
    amount: number;
    fromSymbol?: string;
    toSymbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AssetTransferResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            tranId: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1AssetTransferRequestResult = RequestResult<
  Request,
  PostSapiV1AssetTransferResponse
>;

export function postSapiV1AssetTransfer(
  requestHandler: RequestHandler,
  payload: PostSapiV1AssetTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AssetTransferEndpointSchema,
    }),
    config
  );
}
