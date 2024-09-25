import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MiningWorkerDetailEndpointSchema = {
  path: '/sapi/v1/mining/worker/detail',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    algo: z.string(),
    userName: z.string(),
    workerName: z.string(),
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
            data: z.array(
              z.object({
                workerName: z.string(),
                type: z.string(),
                hashrateDatas: z.array(
                  z.object({
                    time: z.number().int().safe().finite(),
                    hashrate: z.string(),
                    reject: z.number().int().safe().finite(),
                  })
                ),
              })
            ),
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
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

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
