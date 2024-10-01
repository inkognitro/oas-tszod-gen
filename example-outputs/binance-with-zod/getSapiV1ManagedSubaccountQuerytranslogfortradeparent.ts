import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1ManagedSubaccountQuerytranslogfortradeparentEndpointSchema =
  {
    path: '/sapi/v1/managed-subaccount/queryTransLogForTradeParent',
    method: 'get',
    supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
    queryParamsZodSchema: z.object({
      email: z.string(),
      startTime: z.number().int().safe().finite().optional(),
      endTime: z.number().int().safe().finite().optional(),
      page: z.number().int().safe().finite().optional(),
      limit: z.number().int().safe().finite().optional(),
      transfers: z.string().optional(),
      transferFunctionAccountType: z.string().optional(),
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

export type GetSapiV1ManagedSubaccountQuerytranslogfortradeparentPayload = {
  queryParams: {
    email: string;
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    transfers?: string;
    transferFunctionAccountType?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ManagedSubaccountQuerytranslogfortradeparentResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountQuerytranslogfortradeparentRequestResult =
  RequestResult<
    Request,
    GetSapiV1ManagedSubaccountQuerytranslogfortradeparentResponse
  >;

export function getSapiV1ManagedSubaccountQuerytranslogfortradeparent(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ManagedSubaccountQuerytranslogfortradeparentPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountQuerytranslogfortradeparentRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1ManagedSubaccountQuerytranslogfortradeparentEndpointSchema,
    }),
    config
  );
}
