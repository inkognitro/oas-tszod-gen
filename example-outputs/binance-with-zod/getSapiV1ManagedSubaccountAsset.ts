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

export const getSapiV1ManagedSubaccountAssetEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/asset',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
          zodSchema: z.array(
            z.object({
              coin: z.string(),
              name: z.string(),
              totalBalance: z.string(),
              availableBalance: z.string(),
              inOrder: z.string(),
              btcValue: z.string(),
            })
          ),
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

export type GetSapiV1ManagedSubaccountAssetPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ManagedSubaccountAssetResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          coin: string;
          name: string;
          totalBalance: string;
          availableBalance: string;
          inOrder: string;
          btcValue: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountAssetRequestResult = RequestResult<
  Request,
  GetSapiV1ManagedSubaccountAssetResponse
>;

export function getSapiV1ManagedSubaccountAsset(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ManagedSubaccountAssetPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountAssetRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ManagedSubaccountAssetEndpointSchema,
    }),
    config
  );
}
