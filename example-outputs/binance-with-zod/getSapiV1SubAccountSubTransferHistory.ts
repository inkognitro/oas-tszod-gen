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

export const getSapiV1SubAccountSubTransferHistoryEndpointSchema = {
  path: '/sapi/v1/sub-account/sub/transfer/history',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    fromEmail: z.string().optional(),
    toEmail: z.string().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
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
          zodSchema: z.array(
            z.object({
              from: z.string(),
              to: z.string(),
              asset: z.string(),
              qty: z.string(),
              status: z.string(),
              tranId: z.number().int().safe().finite(),
              time: z.number().int().safe().finite(),
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

export type GetSapiV1SubAccountSubTransferHistoryPayload = {
  queryParams: {
    fromEmail?: string;
    toEmail?: string;
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountSubTransferHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          from: string;
          to: string;
          asset: string;
          qty: string;
          status: string;
          tranId: number; // int
          time: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountSubTransferHistoryRequestResult = RequestResult<
  Request,
  GetSapiV1SubAccountSubTransferHistoryResponse
>;

export function getSapiV1SubAccountSubTransferHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountSubTransferHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountSubTransferHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountSubTransferHistoryEndpointSchema,
    }),
    config
  );
}
