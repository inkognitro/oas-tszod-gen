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

export const getSapiV1LendingAutoInvestRebalanceHistoryEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/rebalance/history',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              indexId: z.number().int().safe().finite(),
              indexName: z.string(),
              rebalanceId: z.number().int().safe().finite(),
              status: z.string(),
              rebalanceFee: z.string(),
              rebalanceFeeUnit: z.string(),
              transactionDetails: z.array(
                z.object({
                  asset: z.string(),
                  transactionDateTime: z.number().int().safe().finite(),
                  rebalanceDirection: z.string(),
                  rebalanceAmount: z.string(),
                })
              ),
            })
          ),
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

export type GetSapiV1LendingAutoInvestRebalanceHistoryPayload = {
  queryParams: {
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestRebalanceHistoryResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            indexId: number; // int
            indexName: string;
            rebalanceId: number; // int
            status: string;
            rebalanceFee: string;
            rebalanceFeeUnit: string;
            transactionDetails: {
              asset: string;
              transactionDateTime: number; // int
              rebalanceDirection: string;
              rebalanceAmount: string;
            }[];
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LendingAutoInvestRebalanceHistoryRequestResult =
  RequestResult<Request, GetSapiV1LendingAutoInvestRebalanceHistoryResponse>;

export function getSapiV1LendingAutoInvestRebalanceHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestRebalanceHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestRebalanceHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestRebalanceHistoryEndpointSchema,
    }),
    config
  );
}
