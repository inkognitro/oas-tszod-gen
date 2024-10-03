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

export const postSapiV1AssetDustBtcEndpointSchema = {
  path: '/sapi/v1/asset/dust-btc',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
            details: z.array(
              z.object({
                asset: z.string(),
                assetFullName: z.string(),
                amountFree: z.string(),
                toBTC: z.string(),
                toBNB: z.string(),
                toBNBOffExchange: z.string(),
                exchange: z.string(),
              })
            ),
            totalTransferBtc: z.string(),
            totalTransferBNB: z.string(),
            dribbletPercentage: z.string(),
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

export type PostSapiV1AssetDustBtcRequest = RequestUnion<
  any,
  any,
  {
    accountType?: 'SPOT' | 'MARGIN';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1AssetDustBtcResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          details: {
            asset: string;
            assetFullName: string;
            amountFree: string;
            toBTC: string;
            toBNB: string;
            toBNBOffExchange: string;
            exchange: string;
          }[];
          totalTransferBtc: string;
          totalTransferBNB: string;
          dribbletPercentage: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetDustBtcRequestResult = RequestResult<
  PostSapiV1AssetDustBtcRequest,
  PostSapiV1AssetDustBtcResponse
>;

export function postSapiV1AssetDustBtc(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1AssetDustBtcRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetDustBtcRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1AssetDustBtcEndpointSchema, payload),
    config
  );
}
