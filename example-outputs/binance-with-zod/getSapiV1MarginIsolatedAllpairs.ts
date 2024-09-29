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

export const getSapiV1MarginIsolatedAllpairsEndpointSchema = {
  path: '/sapi/v1/margin/isolated/allPairs',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
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
              symbol: z.string(),
              base: z.string(),
              quote: z.string(),
              isMarginTrade: z.boolean(),
              isBuyAllowed: z.boolean(),
              isSellAllowed: z.boolean(),
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

export type GetSapiV1MarginIsolatedAllpairsPayload = {
  queryParams: {
    symbol: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginIsolatedAllpairsResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol: string;
          base: string;
          quote: string;
          isMarginTrade: boolean;
          isBuyAllowed: boolean;
          isSellAllowed: boolean;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginIsolatedAllpairsRequestResult = RequestResult<
  Request,
  GetSapiV1MarginIsolatedAllpairsResponse
>;

export function getSapiV1MarginIsolatedAllpairs(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginIsolatedAllpairsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedAllpairsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginIsolatedAllpairsEndpointSchema,
    }),
    config
  );
}
