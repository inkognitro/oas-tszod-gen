import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1ConvertExchangeinfoEndpointSchema = {
  path: '/sapi/v1/convert/exchangeInfo',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    fromAsset: z.string().optional(),
    toAsset: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              fromAsset: z.string(),
              toAsset: z.string(),
              fromAssetMinAmount: z.string(),
              fromAssetMaxAmount: z.string(),
              toAssetMinAmount: z.string(),
              toAssetMaxAmount: z.string(),
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

export type GetSapiV1ConvertExchangeinfoPayload = {
  queryParams: {
    fromAsset?: string;
    toAsset?: string;
  };
};

export type GetSapiV1ConvertExchangeinfoResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          fromAsset: string;
          toAsset: string;
          fromAssetMinAmount: string;
          fromAssetMaxAmount: string;
          toAssetMinAmount: string;
          toAssetMaxAmount: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ConvertExchangeinfoRequestResult = RequestResult<
  Request,
  GetSapiV1ConvertExchangeinfoResponse
>;

export function getSapiV1ConvertExchangeinfo(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ConvertExchangeinfoPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertExchangeinfoRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ConvertExchangeinfoEndpointSchema,
    }),
    config
  );
}
