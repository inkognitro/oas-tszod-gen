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

export const getSapiV1NftUserGetassetEndpointSchema = {
  path: '/sapi/v1/nft/user/getAsset',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    limit: z.number().int().safe().finite().optional(),
    page: z.number().int().safe().finite().optional(),
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
            total: z.number().int().safe().finite(),
            list: z.array(
              z.object({
                network: z.string(),
                contractAddress: z.string(),
                tokenId: z.string(),
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

export type GetSapiV1NftUserGetassetRequest = RequestUnion<
  any,
  any,
  {
    limit?: number; // int
    page?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1NftUserGetassetResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          list: {
            network: string;
            contractAddress: string;
            tokenId: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1NftUserGetassetRequestResult = RequestResult<
  GetSapiV1NftUserGetassetRequest,
  GetSapiV1NftUserGetassetResponse
>;

export function getSapiV1NftUserGetasset(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1NftUserGetassetRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1NftUserGetassetRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1NftUserGetassetEndpointSchema, payload),
    config
  );
}
