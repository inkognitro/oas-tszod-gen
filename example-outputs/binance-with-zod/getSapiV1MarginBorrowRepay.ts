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

export const getSapiV1MarginBorrowRepayEndpointSchema = {
  path: '/sapi/v1/margin/borrow-repay',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    asset: z.string(),
    isolatedSymbol: z.string().optional(),
    txId: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
    type: z.string(),
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
            rows: z.array(
              z.object({
                isolatedSymbol: z.string().optional(),
                amount: z.string().optional(),
                asset: z.string(),
                interest: z.string().optional(),
                principal: z.string(),
                status: z.string(),
                timestamp: z.number().int().safe().finite(),
                txId: z.number().int().safe().finite(),
              })
            ),
            total: z.number().int().safe().finite(),
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
  },
};

export type GetSapiV1MarginBorrowRepayPayload = {
  queryParams: {
    asset: string;
    isolatedSymbol?: string;
    txId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    type: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginBorrowRepayResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            isolatedSymbol?: string;
            amount?: string;
            asset: string;
            interest?: string;
            principal: string;
            status: string;
            timestamp: number; // int
            txId: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginBorrowRepayRequestResult = RequestResult<
  Request,
  GetSapiV1MarginBorrowRepayResponse
>;

export function getSapiV1MarginBorrowRepay(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginBorrowRepayPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginBorrowRepayRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginBorrowRepayEndpointSchema,
    }),
    config
  );
}
