import {z_Error, Error} from '@example-outputs/binance-with-zod';
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
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetSapiV1MarginAllpairsRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
  }
>;

export type GetSapiV1MarginAllpairsResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginAllpairsRequestResult = RequestResult<
  GetSapiV1MarginAllpairsRequest,
  GetSapiV1MarginAllpairsResponse
>;

export function getSapiV1MarginAllpairs(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginAllpairsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAllpairsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginAllpairsEndpointSchema, payload),
    config
  );
}
