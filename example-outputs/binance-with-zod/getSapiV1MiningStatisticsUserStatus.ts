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

export const getSapiV1MiningStatisticsUserStatusEndpointSchema = {
  path: '/sapi/v1/mining/statistics/user/status',
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
            data: z.object({
              fifteenMinHashRate: z.string(),
              dayHashRate: z.string(),
              validNum: z.number().int().safe().finite(),
              invalidNum: z.number().int().safe().finite(),
              profitToday: z.object({
                BTC: z.string(),
                BSV: z.string(),
                BCH: z.string(),
              }),
              profitYesterday: z.object({
                BTC: z.string(),
                BSV: z.string(),
                BCH: z.string(),
              }),
              userName: z.string(),
              unit: z.string(),
              algo: z.string(),
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

export type GetSapiV1MiningStatisticsUserStatusRequest = RequestUnion<
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

export type GetSapiV1MiningStatisticsUserStatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            fifteenMinHashRate: string;
            dayHashRate: string;
            validNum: number; // int
            invalidNum: number; // int
            profitToday: {
              BTC: string;
              BSV: string;
              BCH: string;
            };
            profitYesterday: {
              BTC: string;
              BSV: string;
              BCH: string;
            };
            userName: string;
            unit: string;
            algo: string;
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningStatisticsUserStatusRequestResult = RequestResult<
  GetSapiV1MiningStatisticsUserStatusRequest,
  GetSapiV1MiningStatisticsUserStatusResponse
>;

export function getSapiV1MiningStatisticsUserStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MiningStatisticsUserStatusRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningStatisticsUserStatusRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningStatisticsUserStatusEndpointSchema, payload),
    config
  );
}
