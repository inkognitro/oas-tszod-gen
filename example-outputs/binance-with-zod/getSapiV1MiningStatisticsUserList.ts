import {z_Error, Error} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MiningStatisticsUserListEndpointSchema = {
  path: '/sapi/v1/mining/statistics/user/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type GetSapiV1MiningStatisticsUserListRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    userName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

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
  GetSapiV1MiningStatisticsUserListRequest,
  GetSapiV1MiningStatisticsUserListResponse
>;

export function getSapiV1MiningStatisticsUserList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MiningStatisticsUserListRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningStatisticsUserListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningStatisticsUserListEndpointSchema, payload),
    config
  );
}
