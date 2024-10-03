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

export const getSapiV1ManagedSubaccountMarginassetEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/marginAsset',
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
            marginLevel: z.string(),
            totalAssetOfBtc: z.string(),
            totalLiabilityOfBtc: z.string(),
            totalNetAssetOfBtc: z.string(),
            userAssets: z.array(
              z.object({
                asset: z.string(),
                borrowed: z.string(),
                free: z.string(),
                interest: z.string(),
                locked: z.string(),
                netAsset: z.string(),
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

export type GetSapiV1ManagedSubaccountMarginassetRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1ManagedSubaccountMarginassetResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          marginLevel: string;
          totalAssetOfBtc: string;
          totalLiabilityOfBtc: string;
          totalNetAssetOfBtc: string;
          userAssets: {
            asset: string;
            borrowed: string;
            free: string;
            interest: string;
            locked: string;
            netAsset: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountMarginassetRequestResult = RequestResult<
  GetSapiV1ManagedSubaccountMarginassetRequest,
  GetSapiV1ManagedSubaccountMarginassetResponse
>;

export function getSapiV1ManagedSubaccountMarginasset(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ManagedSubaccountMarginassetRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountMarginassetRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1ManagedSubaccountMarginassetEndpointSchema, payload),
    config
  );
}
