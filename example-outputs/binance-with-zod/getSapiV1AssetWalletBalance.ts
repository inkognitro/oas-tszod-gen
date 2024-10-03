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

export const getSapiV1AssetWalletBalanceEndpointSchema = {
  path: '/sapi/v1/asset/wallet/balance',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
              activate: z.boolean(),
              balance: z.string(),
              walletName: z.string(),
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

export type GetSapiV1AssetWalletBalanceRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AssetWalletBalanceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          activate: boolean;
          balance: string;
          walletName: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetWalletBalanceRequestResult = RequestResult<
  GetSapiV1AssetWalletBalanceRequest,
  GetSapiV1AssetWalletBalanceResponse
>;

export function getSapiV1AssetWalletBalance(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1AssetWalletBalanceRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetWalletBalanceRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AssetWalletBalanceEndpointSchema, payload),
    config
  );
}
