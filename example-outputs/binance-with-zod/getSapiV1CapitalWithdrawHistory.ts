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

export const getSapiV1CapitalWithdrawHistoryEndpointSchema = {
  path: '/sapi/v1/capital/withdraw/history',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    coin: z.string().optional(),
    withdrawOrderId: z.string().optional(),
    status: z.number().int().safe().finite().gte(0).lte(6).optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    offset: z.number().int().safe().finite().optional(),
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
          zodSchema: z.array(
            z.object({
              address: z.string(),
              amount: z.string(),
              applyTime: z.string(),
              coin: z.string(),
              id: z.string(),
              withdrawOrderId: z.string(),
              network: z.string(),
              transferType: z.number().int().safe().finite(),
              status: z.number().int().safe().finite(),
              transactionFee: z.string(),
              confirmNo: z.number().int().safe().finite().optional(),
              info: z.string().optional(),
              txId: z.string(),
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

export type GetSapiV1CapitalWithdrawHistoryRequest = RequestUnion<
  any,
  any,
  {
    coin?: string;
    withdrawOrderId?: string;
    status?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    offset?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1CapitalWithdrawHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          address: string;
          amount: string;
          applyTime: string;
          coin: string;
          id: string;
          withdrawOrderId: string;
          network: string;
          transferType: number; // int
          status: number; // int
          transactionFee: string;
          confirmNo?: number; // int
          info?: string;
          txId: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalWithdrawHistoryRequestResult = RequestResult<
  GetSapiV1CapitalWithdrawHistoryRequest,
  GetSapiV1CapitalWithdrawHistoryResponse
>;

export function getSapiV1CapitalWithdrawHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1CapitalWithdrawHistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalWithdrawHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1CapitalWithdrawHistoryEndpointSchema, payload),
    config
  );
}
