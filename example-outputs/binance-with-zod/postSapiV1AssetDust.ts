import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1AssetDustEndpointSchema = {
  path: '/sapi/v1/asset/dust',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.array(z.string()),
    accountType: z.enum(['SPOT', 'MARGIN']).optional(),
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
            totalServiceCharge: z.string(),
            totalTransfered: z.string(),
            transferResult: z.array(
              z.object({
                amount: z.string(),
                fromAsset: z.string(),
                operateTime: z.number().int().safe().finite(),
                serviceChargeAmount: z.string(),
                tranId: z.number().int().safe().finite(),
                transferedAmount: z.string(),
              })
            ),
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

export type PostSapiV1AssetDustPayload = {
  queryParams: {
    asset: string[];
    accountType?: 'SPOT' | 'MARGIN';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AssetDustResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalServiceCharge: string;
          totalTransfered: string;
          transferResult: {
            amount: string;
            fromAsset: string;
            operateTime: number; // int
            serviceChargeAmount: string;
            tranId: number; // int
            transferedAmount: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetDustRequestResult = RequestResult<
  Request,
  PostSapiV1AssetDustResponse
>;

export function postSapiV1AssetDust(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1AssetDustPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetDustRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AssetDustEndpointSchema,
    }),
    config
  );
}
