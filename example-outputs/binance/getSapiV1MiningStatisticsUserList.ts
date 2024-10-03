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

export const getSapiV1MiningStatisticsUserListEndpointSchema = {
  path: '/sapi/v1/mining/statistics/user/list',
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

export type GetSapiV1MiningStatisticsUserListRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    userName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MiningStatisticsUserListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            type: string;
            userName: string;
            list: {
              time: number; // int
              hashrate: string;
              reject: string;
            }[];
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningStatisticsUserListRequestResult = RequestResult<
  GetSapiV1MiningStatisticsUserListRequest,
  GetSapiV1MiningStatisticsUserListResponse
>;

export function getSapiV1MiningStatisticsUserList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MiningStatisticsUserListRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningStatisticsUserListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningStatisticsUserListEndpointSchema, payload),
    config
  );
}
