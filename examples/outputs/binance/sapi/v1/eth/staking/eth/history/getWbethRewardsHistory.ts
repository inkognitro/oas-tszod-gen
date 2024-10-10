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

export const getWbethRewardsHistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/wbethRewardsHistory',
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

export type GetWbethRewardsHistoryRequest = RequestUnion<
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

export type GetWbethRewardsHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          estRewardsInETH: string;
          rows: {
            time: number; // int
            amountInETH: string;
            holding: string;
            holdingInETH: string;
            annualPercentageRate: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetWbethRewardsHistoryRequestResult = RequestResult<
  GetWbethRewardsHistoryRequest,
  GetWbethRewardsHistoryResponse
>;

export function getWbethRewardsHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetWbethRewardsHistoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetWbethRewardsHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getWbethRewardsHistoryEndpointSchema, payload),
    config
  );
}
