import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MiningWorkerListEndpointSchema = {
  path: '/sapi/v1/mining/worker/list',
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

export type GetSapiV1MiningWorkerListPayload = {
  queryParams: {
    algo: string;
    userName: string;
    pageIndex?: number; // int
    sort?: number; // int
    sortColumn?: number; // int
    workerStatus?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MiningWorkerListResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MiningWorkerListRequestResult = RequestResult<
  Request,
  GetSapiV1MiningWorkerListResponse
>;

export function getSapiV1MiningWorkerList(
  requestHandler: RequestHandler,
  payload: GetSapiV1MiningWorkerListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningWorkerListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MiningWorkerListEndpointSchema,
    }),
    config
  );
}
