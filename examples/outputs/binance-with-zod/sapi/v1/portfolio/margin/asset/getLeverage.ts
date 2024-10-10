import {z_Error, Error} from '../../../../../';
import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../../../core';

export const getLeverageEndpointSchema = {
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
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetLeverageRequest = Request;

export type GetLeverageResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset?: string;
          collateralRate?: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetLeverageRequestResult = RequestResult<
  GetLeverageRequest,
  GetLeverageResponse
>;

export function getLeverage(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetLeverageRequestResult> {
  return requestHandler.execute(
    createRequest(getLeverageEndpointSchema),
    config
  );
}
