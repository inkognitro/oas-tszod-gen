import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../core';
import {Error} from '../../../';

export const getCrossMarginCollateralRatioEndpointSchema = {
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

export type GetCrossMarginCollateralRatioRequest = Request;

export type GetCrossMarginCollateralRatioResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetCrossMarginCollateralRatioRequestResult = RequestResult<
  GetCrossMarginCollateralRatioRequest,
  GetCrossMarginCollateralRatioResponse
>;

export function getCrossMarginCollateralRatio(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetCrossMarginCollateralRatioRequestResult> {
  return requestHandler.execute(
    createRequest(getCrossMarginCollateralRatioEndpointSchema),
    config
  );
}
