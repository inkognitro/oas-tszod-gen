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

export const getSapiV3SubAccountAssetsEndpointSchema = {
  path: '/sapi/v3/sub-account/assets',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
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
            balances: z.array(
              z.object({
                asset: z.string(),
                free: z.number().int().safe().finite(),
                locked: z.number().int().safe().finite(),
              })
            ),
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

export type GetSapiV3SubAccountAssetsRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV3SubAccountAssetsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          balances: {
            asset: string;
            free: number; // int
            locked: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV3SubAccountAssetsRequestResult = RequestResult<
  GetSapiV3SubAccountAssetsRequest,
  GetSapiV3SubAccountAssetsResponse
>;

export function getSapiV3SubAccountAssets(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV3SubAccountAssetsRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV3SubAccountAssetsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV3SubAccountAssetsEndpointSchema, payload),
    config
  );
}
