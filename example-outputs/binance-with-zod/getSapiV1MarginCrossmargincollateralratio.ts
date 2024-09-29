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

export const getSapiV1MarginCrossmargincollateralratioEndpointSchema = {
  path: '/sapi/v1/margin/crossMarginCollateralRatio',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              collaterals: z.array(
                z.object({
                  minUsdValue: z.string(),
                  maxUsdValue: z.string(),
                  discountRate: z.string(),
                })
              ),
              assetNames: z.array(z.string()),
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

export type GetSapiV1MarginCrossmargincollateralratioResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          collaterals: {
            minUsdValue: string;
            maxUsdValue: string;
            discountRate: string;
          }[];
          assetNames: string[];
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginCrossmargincollateralratioRequestResult =
  RequestResult<Request, GetSapiV1MarginCrossmargincollateralratioResponse>;

export function getSapiV1MarginCrossmargincollateralratio(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginCrossmargincollateralratioRequestResult> {
  return requestHandler.execute(
    createRequest({
      endpointSchema: getSapiV1MarginCrossmargincollateralratioEndpointSchema,
    }),
    config
  );
}
