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

export const getSapiV1PortfolioCollateralrateEndpointSchema = {
  path: '/sapi/v1/portfolio/collateralRate',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              asset: z.string(),
              collateralRate: z.string(),
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

export type GetSapiV1PortfolioCollateralrateRequest = Request;

export type GetSapiV1PortfolioCollateralrateResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          collateralRate: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioCollateralrateRequestResult = RequestResult<
  GetSapiV1PortfolioCollateralrateRequest,
  GetSapiV1PortfolioCollateralrateResponse
>;

export function getSapiV1PortfolioCollateralrate(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioCollateralrateRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1PortfolioCollateralrateEndpointSchema),
    config
  );
}
