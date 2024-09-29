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

export const getSapiV1MarginTransferEndpointSchema = {
  path: '/sapi/v1/margin/transfer',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    type: z.enum(['ROLL_IN', 'ROLL_OUT']).optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
    isolatedSymbol: z.string().optional(),
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
                amount: z.string(),
                asset: z.string(),
                status: z.string(),
                timestamp: z.number().int().safe().finite(),
                txId: z.number().int().safe().finite(),
                type: z.string(),
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
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1MarginTransferPayload = {
  queryParams: {
    asset?: string;
    type?: 'ROLL_IN' | 'ROLL_OUT';
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    isolatedSymbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginTransferResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            amount: string;
            asset: string;
            status: string;
            timestamp: number; // int
            txId: number; // int
            type: string;
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginTransferRequestResult = RequestResult<
  Request,
  GetSapiV1MarginTransferResponse
>;

export function getSapiV1MarginTransfer(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginTransferEndpointSchema,
    }),
    config
  );
}
