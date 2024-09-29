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

export const getSapiV1LendingAutoInvestHistoryListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/history/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    planId: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    targetAsset: z.number().safe().finite().optional(),
    planType: z.enum(['SINGLE', 'PORTFOLIO', 'INDEX', 'ALL']).optional(),
    size: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
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
              id: z.number().int().safe().finite(),
              targetAsset: z.string(),
              planType: z.string(),
              planName: z.string(),
              planId: z.number().int().safe().finite(),
              transactionDateTime: z.number().int().safe().finite(),
              transactionStatus: z.string(),
              failedType: z.string(),
              sourceAsset: z.string(),
              sourceAssetAmount: z.string(),
              targetAssetAmount: z.string(),
              sourceWallet: z.string(),
              flexibleUsed: z.string(),
              transactionFee: z.string(),
              transactionFeeUnit: z.string(),
              executionPrice: z.string(),
              executionType: z.string(),
              subscriptionCycle: z.string(),
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

export type GetSapiV1LendingAutoInvestHistoryListPayload = {
  queryParams: {
    planId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    targetAsset?: number;
    planType?: 'SINGLE' | 'PORTFOLIO' | 'INDEX' | 'ALL';
    size?: number; // int
    current?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestHistoryListResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          id: number; // int
          targetAsset: string;
          planType: string;
          planName: string;
          planId: number; // int
          transactionDateTime: number; // int
          transactionStatus: string;
          failedType: string;
          sourceAsset: string;
          sourceAssetAmount: string;
          targetAssetAmount: string;
          sourceWallet: string;
          flexibleUsed: string;
          transactionFee: string;
          transactionFeeUnit: string;
          executionPrice: string;
          executionType: string;
          subscriptionCycle: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestHistoryListRequestResult = RequestResult<
  Request,
  GetSapiV1LendingAutoInvestHistoryListResponse
>;

export function getSapiV1LendingAutoInvestHistoryList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestHistoryListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestHistoryListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestHistoryListEndpointSchema,
    }),
    config
  );
}
