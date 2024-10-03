import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1CapitalContractConvertibleCoinsEndpointSchema = {
  path: '/sapi/v1/capital/contract/convertible-coins',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            convertEnabled: z.boolean(),
            coins: z.array(z.string()),
            exchangeRates: z.object({
              USDC: z.string(),
              TUSD: z.string(),
              USDP: z.string(),
            }),
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

export type GetSapiV1CapitalContractConvertibleCoinsRequest = Request;

export type GetSapiV1CapitalContractConvertibleCoinsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          convertEnabled: boolean;
          coins: string[];
          exchangeRates: {
            USDC: string;
            TUSD: string;
            USDP: string;
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalContractConvertibleCoinsRequestResult =
  RequestResult<
    GetSapiV1CapitalContractConvertibleCoinsRequest,
    GetSapiV1CapitalContractConvertibleCoinsResponse
  >;

export function getSapiV1CapitalContractConvertibleCoins(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalContractConvertibleCoinsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1CapitalContractConvertibleCoinsEndpointSchema),
    config
  );
}
