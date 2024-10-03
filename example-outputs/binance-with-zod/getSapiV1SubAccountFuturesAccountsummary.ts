import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1SubAccountFuturesAccountsummaryEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/accountSummary',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
            totalInitialMargin: z.string(),
            totalMaintenanceMargin: z.string(),
            totalMarginBalance: z.string(),
            totalOpenOrderInitialMargin: z.string(),
            totalPositionInitialMargin: z.string(),
            totalUnrealizedProfit: z.string(),
            totalWalletBalance: z.string(),
            asset: z.string(),
            subAccountList: z.array(
              z.object({
                email: z.string(),
                totalInitialMargin: z.string(),
                totalMaintenanceMargin: z.string(),
                totalMarginBalance: z.string(),
                totalOpenOrderInitialMargin: z.string(),
                totalPositionInitialMargin: z.string(),
                totalUnrealizedProfit: z.string(),
                totalWalletBalance: z.string(),
                asset: z.string(),
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

export type GetSapiV1SubAccountFuturesAccountsummaryRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SubAccountFuturesAccountsummaryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalInitialMargin: string;
          totalMaintenanceMargin: string;
          totalMarginBalance: string;
          totalOpenOrderInitialMargin: string;
          totalPositionInitialMargin: string;
          totalUnrealizedProfit: string;
          totalWalletBalance: string;
          asset: string;
          subAccountList: {
            email: string;
            totalInitialMargin: string;
            totalMaintenanceMargin: string;
            totalMarginBalance: string;
            totalOpenOrderInitialMargin: string;
            totalPositionInitialMargin: string;
            totalUnrealizedProfit: string;
            totalWalletBalance: string;
            asset: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountFuturesAccountsummaryRequestResult =
  RequestResult<
    GetSapiV1SubAccountFuturesAccountsummaryRequest,
    GetSapiV1SubAccountFuturesAccountsummaryResponse
  >;

export function getSapiV1SubAccountFuturesAccountsummary(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SubAccountFuturesAccountsummaryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountFuturesAccountsummaryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SubAccountFuturesAccountsummaryEndpointSchema,
      payload
    ),
    config
  );
}
