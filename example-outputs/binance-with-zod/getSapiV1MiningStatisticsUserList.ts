import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MiningStatisticsUserListEndpointSchema = {
  path: '/sapi/v1/mining/statistics/user/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    algo: z.string(),
    userName: z.string(),
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
                type: z.string(),
                userName: z.string(),
                list: z.array(
                  z.object({
                    time: z.number().int().safe().finite(),
                    hashrate: z.string(),
                    reject: z.string(),
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
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

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
