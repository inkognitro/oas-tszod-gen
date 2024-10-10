import {z_Error, Error} from '../../../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';

export const getListEndpointSchema = {
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
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetListRequest = RequestUnion<
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

export type GetListResponse =
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

export type GetListRequestResult = RequestResult<
  GetListRequest,
  GetListResponse
>;

export function getList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetListRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetListRequestResult> {
  return requestHandler.execute(
    createRequest(getListEndpointSchema, payload),
    config
  );
}
