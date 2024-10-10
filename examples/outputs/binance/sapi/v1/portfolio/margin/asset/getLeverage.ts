import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../../../core';
import {Error} from '../../../../../';

export const getLeverageEndpointSchema = {
  path: '/sapi/v1/portfolio/margin-asset-leverage',
  method: 'get',
  supportedSecuritySchemas: [],
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
    '401': {
      bodyByContentType: {
        'application/json': {},
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
