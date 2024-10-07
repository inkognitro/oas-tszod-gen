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
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetSapiV1PortfolioAssetIndexPriceRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
  }
>;

export type GetSapiV1PortfolioAssetIndexPriceResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioAssetIndexPriceRequestResult = RequestResult<
  GetSapiV1PortfolioAssetIndexPriceRequest,
  GetSapiV1PortfolioAssetIndexPriceResponse
>;

export function getSapiV1PortfolioAssetIndexPrice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1PortfolioAssetIndexPriceRequest,
    never,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioAssetIndexPriceRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1PortfolioAssetIndexPriceEndpointSchema, payload),
    config
  );
}
