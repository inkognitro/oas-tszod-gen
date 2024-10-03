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

export const getSapiV1MarginInterestratehistoryEndpointSchema = {
  path: '/sapi/v1/margin/interestRateHistory',
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

export type GetSapiV1MarginInterestratehistoryRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    vipLevel?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginInterestratehistoryResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginInterestratehistoryRequestResult = RequestResult<
  GetSapiV1MarginInterestratehistoryRequest,
  GetSapiV1MarginInterestratehistoryResponse
>;

export function getSapiV1MarginInterestratehistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginInterestratehistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginInterestratehistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginInterestratehistoryEndpointSchema, payload),
    config
  );
}
