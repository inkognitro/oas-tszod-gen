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

export const getSapiV1AssetWalletBalanceEndpointSchema = {
  path: '/sapi/v1/asset/wallet/balance',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1AssetWalletBalancePayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AssetWalletBalanceResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetWalletBalanceRequestResult = RequestResult<
  Request,
  GetSapiV1AssetWalletBalanceResponse
>;

export function getSapiV1AssetWalletBalance(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AssetWalletBalancePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetWalletBalanceRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AssetWalletBalanceEndpointSchema,
    }),
    config
  );
}
