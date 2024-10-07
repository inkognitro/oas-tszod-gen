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

export const postSapiV1AssetTransferEndpointSchema = {
  path: '/sapi/v1/asset/transfer',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    type: z.enum([
      'MAIN_C2C',
      'MAIN_UMFUTURE',
      'MAIN_CMFUTURE',
      'MAIN_MARGIN',
      'MAIN_MINING',
      'C2C_MAIN',
      'C2C_UMFUTURE',
      'C2C_MINING',
      'C2C_MARGIN',
      'UMFUTURE_MAIN',
      'UMFUTURE_C2C',
      'UMFUTURE_MARGIN',
      'CMFUTURE_MAIN',
      'CMFUTURE_MARGIN',
      'MARGIN_MAIN',
      'MARGIN_UMFUTURE',
      'MARGIN_CMFUTURE',
      'MARGIN_MINING',
      'MARGIN_C2C',
      'MINING_MAIN',
      'MINING_UMFUTURE',
      'MINING_C2C',
      'MINING_MARGIN',
      'MAIN_PAY',
      'PAY_MAIN',
      'ISOLATEDMARGIN_MARGIN',
      'MARGIN_ISOLATEDMARGIN',
      'ISOLATEDMARGIN_ISOLATEDMARGIN',
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

export type PostSapiV1AssetTransferRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type PostSapiV1AssetTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetTransferRequestResult = RequestResult<
  PostSapiV1AssetTransferRequest,
  PostSapiV1AssetTransferResponse
>;

export function postSapiV1AssetTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1AssetTransferRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetTransferRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1AssetTransferEndpointSchema, payload),
    config
  );
}
