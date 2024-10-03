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

export const getSapiV1MiningWorkerListEndpointSchema = {
  path: '/sapi/v1/mining/worker/list',
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

export type GetSapiV1MiningWorkerListRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    userName: string;
    pageIndex?: number; // int
    sort?: number; // int
    sortColumn?: number; // int
    workerStatus?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MiningWorkerListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            workerDatas: {
              workerId: string;
              workerName: string;
              status: number; // int
              hashRate: number; // int
              dayHashRate: number; // int
              rejectRate: number; // int
              lastShareTime: number; // int
            }[];
            totalNum: number; // int
            pageSize: number; // int
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningWorkerListRequestResult = RequestResult<
  GetSapiV1MiningWorkerListRequest,
  GetSapiV1MiningWorkerListResponse
>;

export function getSapiV1MiningWorkerList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MiningWorkerListRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningWorkerListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningWorkerListEndpointSchema, payload),
    config
  );
}
