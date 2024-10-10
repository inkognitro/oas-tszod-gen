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

export const getDetailEndpointSchema = {
  path: '/sapi/v1/mining/worker/detail',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type GetDetailRequest = RequestUnion<
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

export type GetDetailResponse =
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

export type GetDetailRequestResult = RequestResult<
  GetDetailRequest,
  GetDetailResponse
>;

export function getDetail(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetDetailRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetDetailRequestResult> {
  return requestHandler.execute(
    createRequest(getDetailEndpointSchema, payload),
    config
  );
}
