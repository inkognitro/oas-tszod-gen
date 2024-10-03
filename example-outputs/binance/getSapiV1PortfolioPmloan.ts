import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSapiV1PortfolioPmloanEndpointSchema = {
  path: '/sapi/v1/portfolio/pmLoan',
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
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetSapiV1PortfolioPmloanRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1PortfolioPmloanResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          amount: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioPmloanRequestResult = RequestResult<
  GetSapiV1PortfolioPmloanRequest,
  GetSapiV1PortfolioPmloanResponse
>;

export function getSapiV1PortfolioPmloan(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1PortfolioPmloanRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioPmloanRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1PortfolioPmloanEndpointSchema, payload),
    config
  );
}
