import {z_Error, Error} from '../../../../../';
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
} from '../../../../../core';

export const getStatisticsEndpointSchema = {
  path: '/sapi/v1/sub-account/transaction-statistics',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
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
            recent30BtcTotal: z.string(),
            recent30BtcFuturesTotal: z.string(),
            recent30BtcMarginTotal: z.string(),
            recent30BusdTotal: z.string(),
            recent30BusdFuturesTotal: z.string(),
            recent30BusdMarginTotal: z.string(),
            tradeInfoVos: z.array(
              z.object({
                userId: z.number().int().safe().finite().optional(),
                btc: z.number().safe().finite().optional(),
                btcFutures: z.number().safe().finite().optional(),
                btcMargin: z.number().safe().finite().optional(),
                busd: z.number().safe().finite().optional(),
                busdFutures: z.number().safe().finite().optional(),
                busdMargin: z.number().safe().finite().optional(),
                date: z.number().int().safe().finite().optional(),
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

export type GetStatisticsRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetStatisticsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          recent30BtcTotal: string;
          recent30BtcFuturesTotal: string;
          recent30BtcMarginTotal: string;
          recent30BusdTotal: string;
          recent30BusdFuturesTotal: string;
          recent30BusdMarginTotal: string;
          tradeInfoVos: {
            userId?: number; // int
            btc?: number;
            btcFutures?: number;
            btcMargin?: number;
            busd?: number;
            busdFutures?: number;
            busdMargin?: number;
            date?: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetStatisticsRequestResult = RequestResult<
  GetStatisticsRequest,
  GetStatisticsResponse
>;

export function getStatistics(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetStatisticsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetStatisticsRequestResult> {
  return requestHandler.execute(
    createRequest(getStatisticsEndpointSchema, payload),
    config
  );
}
