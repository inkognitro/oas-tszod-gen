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

export const getSapiV1MarginInterestratehistoryEndpointSchema = {
  path: '/sapi/v1/margin/interestRateHistory',
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

export type GetSapiV1MarginInterestratehistoryPayload = {
  queryParams: {
    asset: string;
    vipLevel?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginInterestratehistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          dailyInterestRate: string;
          timestamp: number; // int
          vipLevel: number; // int
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginInterestratehistoryRequestResult = RequestResult<
  Request,
  GetSapiV1MarginInterestratehistoryResponse
>;

export function getSapiV1MarginInterestratehistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginInterestratehistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginInterestratehistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginInterestratehistoryEndpointSchema,
    }),
    config
  );
}
