import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1CapitalContractConvertibleCoinsEndpointSchema = {
  path: '/sapi/v1/capital/contract/convertible-coins',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1CapitalContractConvertibleCoinsResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1CapitalContractConvertibleCoinsRequestResult =
  RequestResult<Request, GetSapiV1CapitalContractConvertibleCoinsResponse>;

export function getSapiV1CapitalContractConvertibleCoins(
  requestHandler: RequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalContractConvertibleCoinsRequestResult> {
  return requestHandler.execute(
    createRequest({
      endpointSchema: getSapiV1CapitalContractConvertibleCoinsEndpointSchema,
    }),
    config
  );
}
