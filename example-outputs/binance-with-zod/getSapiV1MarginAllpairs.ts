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

export const getSapiV1MarginAllpairsEndpointSchema = {
  path: '/sapi/v1/margin/allPairs',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              base: z.string(),
              id: z.number().int().safe().finite(),
              isBuyAllowed: z.boolean(),
              isMarginTrade: z.boolean(),
              isSellAllowed: z.boolean(),
              quote: z.string(),
              symbol: z.string(),
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
  },
};

export type GetSapiV1MarginAllpairsPayload = {
  queryParams: {
    symbol: string;
  };
};

export type GetSapiV1MarginAllpairsResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          base: string;
          id: number; // int
          isBuyAllowed: boolean;
          isMarginTrade: boolean;
          isSellAllowed: boolean;
          quote: string;
          symbol: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginAllpairsRequestResult = RequestResult<
  Request,
  GetSapiV1MarginAllpairsResponse
>;

export function getSapiV1MarginAllpairs(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginAllpairsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAllpairsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginAllpairsEndpointSchema,
    }),
    config
  );
}
