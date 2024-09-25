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

export const getSapiV1CapitalWithdrawHistoryEndpointSchema = {
  path: '/sapi/v1/capital/withdraw/history',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1CapitalWithdrawHistoryPayload = {
  queryParams: {
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
  };
};

export type GetSapiV1CapitalWithdrawHistoryResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1CapitalWithdrawHistoryRequestResult = RequestResult<
  Request,
  GetSapiV1CapitalWithdrawHistoryResponse
>;

export function getSapiV1CapitalWithdrawHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1CapitalWithdrawHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalWithdrawHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1CapitalWithdrawHistoryEndpointSchema,
    }),
    config
  );
}
