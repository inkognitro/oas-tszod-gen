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

export const getSapiV1PortfolioPmloanEndpointSchema = {
  path: '/sapi/v1/portfolio/pmLoan',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1PortfolioPmloanPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1PortfolioPmloanResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          amount: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioPmloanRequestResult = RequestResult<
  Request,
  GetSapiV1PortfolioPmloanResponse
>;

export function getSapiV1PortfolioPmloan(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1PortfolioPmloanPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioPmloanRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1PortfolioPmloanEndpointSchema,
    }),
    config
  );
}
