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

export const getSapiV1ManagedSubaccountQueryTransLogEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/query-trans-log',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    page: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    transfers: z.enum(['FROM', 'TO']),
    transferFunctionAccountType: z.enum([
      'SPOT',
      'MARGIN',
      'ISOLATED_MARGIN',
      'USDT_FUTURE',
      'COIN_FUTURE',
    ]),
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
            count: z.number().int().safe().finite(),
            managerSubTransferHistoryVos: z.array(
              z.object({
                fromEmail: z.string(),
                fromAccountType: z.string(),
                toEmail: z.string(),
                toAccountType: z.string(),
                asset: z.string(),
                amount: z.string(),
                scheduledData: z.number().int().safe().finite(),
                createTime: z.number().int().safe().finite(),
                status: z.string(),
                tranId: z.number().int().safe().finite(),
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

export type GetSapiV1ManagedSubaccountQueryTransLogPayload = {
  queryParams: {
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    transfers: 'FROM' | 'TO';
    transferFunctionAccountType:
      | 'SPOT'
      | 'MARGIN'
      | 'ISOLATED_MARGIN'
      | 'USDT_FUTURE'
      | 'COIN_FUTURE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ManagedSubaccountQueryTransLogResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          count: number; // int
          managerSubTransferHistoryVos: {
            fromEmail: string;
            fromAccountType: string;
            toEmail: string;
            toAccountType: string;
            asset: string;
            amount: string;
            scheduledData: number; // int
            createTime: number; // int
            status: string;
            tranId: number; // int
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountQueryTransLogRequestResult =
  RequestResult<Request, GetSapiV1ManagedSubaccountQueryTransLogResponse>;

export function getSapiV1ManagedSubaccountQueryTransLog(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ManagedSubaccountQueryTransLogPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountQueryTransLogRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ManagedSubaccountQueryTransLogEndpointSchema,
    }),
    config
  );
}
