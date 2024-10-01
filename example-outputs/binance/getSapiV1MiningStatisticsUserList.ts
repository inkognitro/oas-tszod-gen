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

export type GetSapiV1MiningStatisticsUserListPayload = {
  queryParams: {
    algo: string;
    userName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  GetSapiV1MiningStatisticsUserListResponse
>;

export function getSapiV1MiningStatisticsUserList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MiningStatisticsUserListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningStatisticsUserListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MiningStatisticsUserListEndpointSchema,
    }),
    config
  );
}
