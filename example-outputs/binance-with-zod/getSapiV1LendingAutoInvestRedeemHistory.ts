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

export const getSapiV1LendingAutoInvestRedeemHistoryEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/redeem/history',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    requestId: z.number().int().safe().finite(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
    asset: z.string().optional(),
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
              redemptionId: z.number().int().safe().finite(),
              status: z.string(),
              asset: z.string(),
              amount: z.string(),
              redemptionDateTime: z.number().int().safe().finite(),
              transactionFee: z.string(),
              transactionFeeUnit: z.string(),
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

export type GetSapiV1LendingAutoInvestRedeemHistoryPayload = {
  queryParams: {
    requestId: number; // int
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    asset?: string;
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestRedeemHistoryResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            indexId: number; // int
            indexName: string;
            redemptionId: number; // int
            status: string;
            asset: string;
            amount: string;
            redemptionDateTime: number; // int
            transactionFee: string;
            transactionFeeUnit: string;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LendingAutoInvestRedeemHistoryRequestResult =
  RequestResult<Request, GetSapiV1LendingAutoInvestRedeemHistoryResponse>;

export function getSapiV1LendingAutoInvestRedeemHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestRedeemHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestRedeemHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestRedeemHistoryEndpointSchema,
    }),
    config
  );
}
