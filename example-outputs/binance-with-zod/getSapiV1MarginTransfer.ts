import {z_Error, Error} from '@example-outputs/binance-with-zod';
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
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetSapiV1MarginTransferRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetSapiV1MarginTransferResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginTransferRequestResult = RequestResult<
  GetSapiV1MarginTransferRequest,
  GetSapiV1MarginTransferResponse
>;

export function getSapiV1MarginTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginTransferRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginTransferRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginTransferEndpointSchema, payload),
    config
  );
}
