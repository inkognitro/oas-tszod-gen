import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../../core';
import {Error} from '../../../../../../';

export const getRateHistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/rateHistory',
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

export type GetRateHistoryRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetRateHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            annualPercentageRate: string;
            exchangeRate: string;
            time: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetRateHistoryRequestResult = RequestResult<
  GetRateHistoryRequest,
  GetRateHistoryResponse
>;

export function getRateHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetRateHistoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetRateHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getRateHistoryEndpointSchema, payload),
    config
  );
}
