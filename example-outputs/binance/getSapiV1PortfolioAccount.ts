import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1PortfolioAccountEndpointSchema = {
  path: '/sapi/v1/portfolio/account',
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

export type GetSapiV1PortfolioAccountPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1PortfolioAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          uniMMR: string;
          accountEquity: string;
          actualEquity: string;
          accountMaintMargin: string;
          accountStatus: string;
          accountType: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PortfolioAccountRequestResult = RequestResult<
  Request,
  GetSapiV1PortfolioAccountResponse
>;

export function getSapiV1PortfolioAccount(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1PortfolioAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PortfolioAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1PortfolioAccountEndpointSchema,
    }),
    config
  );
}
