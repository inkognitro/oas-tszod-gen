import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MiningWorkerListEndpointSchema = {
  path: '/sapi/v1/mining/worker/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    algo: z.string(),
    userName: z.string(),
    pageIndex: z.number().int().safe().finite().optional(),
    sort: z.number().int().safe().finite().optional(),
    sortColumn: z.number().int().safe().finite().optional(),
    workerStatus: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            code: z.number().int().safe().finite(),
            msg: z.string(),
            data: z.object({
              workerDatas: z.array(
                z.object({
                  workerId: z.string(),
                  workerName: z.string(),
                  status: z.number().int().safe().finite(),
                  hashRate: z.number().int().safe().finite(),
                  dayHashRate: z.number().int().safe().finite(),
                  rejectRate: z.number().int().safe().finite(),
                  lastShareTime: z.number().int().safe().finite(),
                })
              ),
              totalNum: z.number().int().safe().finite(),
              pageSize: z.number().int().safe().finite(),
            }),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
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
  Request,
  GetSapiV1MiningWorkerListResponse
>;

export function getSapiV1MiningWorkerList(
  requestHandler: SimpleRequestHandler,
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
