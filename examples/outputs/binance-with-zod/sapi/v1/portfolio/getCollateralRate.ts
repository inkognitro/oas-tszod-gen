import {z_Error, Error} from '../../../';
import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../core';

export const getCollateralRateEndpointSchema = {
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
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetCollateralRateRequest = Request;

export type GetCollateralRateResponse =
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

export type GetCollateralRateRequestResult = RequestResult<
  GetCollateralRateRequest,
  GetCollateralRateResponse
>;

export function getCollateralRate(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetCollateralRateRequestResult> {
  return requestHandler.execute(
    createRequest(getCollateralRateEndpointSchema),
    config
  );
}
