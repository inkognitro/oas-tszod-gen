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

export const getSapiV1MiningWorkerDetailEndpointSchema = {
  path: '/sapi/v1/mining/worker/detail',
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

export type GetSapiV1MiningWorkerDetailRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    userName: string;
    workerName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MiningWorkerDetailResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningWorkerDetailRequestResult = RequestResult<
  GetSapiV1MiningWorkerDetailRequest,
  GetSapiV1MiningWorkerDetailResponse
>;

export function getSapiV1MiningWorkerDetail(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MiningWorkerDetailRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningWorkerDetailRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningWorkerDetailEndpointSchema, payload),
    config
  );
}
