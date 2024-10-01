import {
  subAccountUSDTFuturesSummaryZodSchema,
  subAccountCOINFuturesSummaryZodSchema,
  errorZodSchema,
  SubAccountUSDTFuturesSummary,
  SubAccountCOINFuturesSummary,
  Error,
} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV2SubAccountFuturesAccountsummaryEndpointSchema = {
  path: '/sapi/v2/sub-account/futures/accountSummary',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    futuresType: z.number().int().safe().finite(),
    page: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([
            subAccountUSDTFuturesSummaryZodSchema,
            subAccountCOINFuturesSummaryZodSchema,
          ]),
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

export type GetSapiV2SubAccountFuturesAccountsummaryPayload = {
  queryParams: {
    futuresType: number; // int
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2SubAccountFuturesAccountsummaryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        SubAccountUSDTFuturesSummary | SubAccountCOINFuturesSummary
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2SubAccountFuturesAccountsummaryRequestResult =
  RequestResult<Request, GetSapiV2SubAccountFuturesAccountsummaryResponse>;

export function getSapiV2SubAccountFuturesAccountsummary(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2SubAccountFuturesAccountsummaryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2SubAccountFuturesAccountsummaryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2SubAccountFuturesAccountsummaryEndpointSchema,
    }),
    config
  );
}
