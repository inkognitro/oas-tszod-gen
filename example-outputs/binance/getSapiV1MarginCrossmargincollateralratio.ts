import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MarginCrossmargincollateralratioEndpointSchema = {
  path: '/sapi/v1/margin/crossMarginCollateralRatio',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
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
