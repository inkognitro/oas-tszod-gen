import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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

export type GetSapiV3SubAccountAssetsPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV3SubAccountAssetsResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV3SubAccountAssetsRequestResult = RequestResult<
  Request,
  GetSapiV3SubAccountAssetsResponse
>;

export function getSapiV3SubAccountAssets(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV3SubAccountAssetsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV3SubAccountAssetsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV3SubAccountAssetsEndpointSchema,
    }),
    config
  );
}
