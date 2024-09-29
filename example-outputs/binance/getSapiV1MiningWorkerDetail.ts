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

export const getSapiV1MiningWorkerDetailEndpointSchema = {
  path: '/sapi/v1/mining/worker/detail',
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

export type GetSapiV1MiningWorkerDetailPayload = {
  queryParams: {
    algo: string;
    userName: string;
    workerName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MiningWorkerDetailResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            workerName: string;
            type: string;
            hashrateDatas: {
              time: number; // int
              hashrate: string;
              reject: number; // int
            }[];
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningWorkerDetailRequestResult = RequestResult<
  Request,
  GetSapiV1MiningWorkerDetailResponse
>;

export function getSapiV1MiningWorkerDetail(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MiningWorkerDetailPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningWorkerDetailRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MiningWorkerDetailEndpointSchema,
    }),
    config
  );
}
