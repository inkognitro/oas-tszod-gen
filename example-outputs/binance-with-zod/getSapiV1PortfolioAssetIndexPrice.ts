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

export const getSapiV1PortfolioAssetIndexPriceEndpointSchema = {
  path: '/sapi/v1/portfolio/asset-index-price',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              asset: z.string(),
              assetIndexPrice: z.string(),
              time: z.number().int().safe().finite(),
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

export type GetSapiV1PortfolioAssetIndexPricePayload = {
  queryParams: {
    asset?: string;
  };
};

export type GetSapiV1PortfolioAssetIndexPriceResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          assetIndexPrice: string;
          time: number; // int
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioAssetIndexPriceRequestResult = RequestResult<
  Request,
  GetSapiV1PortfolioAssetIndexPriceResponse
>;

export function getSapiV1PortfolioAssetIndexPrice(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1PortfolioAssetIndexPricePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioAssetIndexPriceRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1PortfolioAssetIndexPriceEndpointSchema,
    }),
    config
  );
}
