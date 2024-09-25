import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1PortfolioMarginAssetLeverageEndpointSchema = {
  path: '/sapi/v1/portfolio/margin-asset-leverage',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              asset: z.string().optional(),
              collateralRate: z.string().optional(),
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

export type GetSapiV1PortfolioMarginAssetLeverageResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            asset?: string;
            collateralRate?: string;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1PortfolioMarginAssetLeverageRequestResult = RequestResult<
  Request,
  GetSapiV1PortfolioMarginAssetLeverageResponse
>;

export function getSapiV1PortfolioMarginAssetLeverage(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioMarginAssetLeverageRequestResult> {
  return requestHandler.execute(
    createRequest({
      endpointSchema: getSapiV1PortfolioMarginAssetLeverageEndpointSchema,
    }),
    config
  );
}
