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

export const getSapiV1PortfolioInterestHistoryEndpointSchema = {
  path: '/sapi/v1/portfolio/interest-history',
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

export type GetSapiV1PortfolioInterestHistoryRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    startTime?: number; // int
    endTime?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1PortfolioInterestHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          interest: string;
          interestAccruedTime: number; // int
          interestRate: string;
          principal: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioInterestHistoryRequestResult = RequestResult<
  GetSapiV1PortfolioInterestHistoryRequest,
  GetSapiV1PortfolioInterestHistoryResponse
>;

export function getSapiV1PortfolioInterestHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1PortfolioInterestHistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioInterestHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1PortfolioInterestHistoryEndpointSchema, payload),
    config
  );
}
