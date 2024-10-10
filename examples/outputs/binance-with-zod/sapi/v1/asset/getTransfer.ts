import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const getTransferEndpointSchema = {
  path: '/sapi/v1/asset/transfer',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    type: z.enum([
      'MAIN_C2C',
      'MAIN_UMFUTURE',
      'MAIN_CMFUTURE',
      'MAIN_MARGIN',
      'MAIN_MINING',
      'C2C_MAIN',
      'C2C_UMFUTURE',
      'C2C_MINING',
      'C2C_MARGIN',
      'UMFUTURE_MAIN',
      'UMFUTURE_C2C',
      'UMFUTURE_MARGIN',
      'CMFUTURE_MAIN',
      'CMFUTURE_MARGIN',
      'MARGIN_MAIN',
      'MARGIN_UMFUTURE',
      'MARGIN_CMFUTURE',
      'MARGIN_MINING',
      'MARGIN_C2C',
      'MINING_MAIN',
      'MINING_UMFUTURE',
      'MINING_C2C',
      'MINING_MARGIN',
      'MAIN_PAY',
      'PAY_MAIN',
      'ISOLATEDMARGIN_MARGIN',
      'MARGIN_ISOLATEDMARGIN',
      'ISOLATEDMARGIN_ISOLATEDMARGIN',
    ]),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
    fromSymbol: z.string().optional(),
    toSymbol: z.string().optional(),
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
            total: z.number().int().safe().finite(),
            rows: z.array(
              z.object({
                asset: z.string(),
                amount: z.string(),
                type: z.string(),
                status: z.string(),
                tranId: z.number().int().safe().finite(),
                timestamp: z.number().int().safe().finite(),
              })
            ),
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

export type GetTransferRequest = RequestUnion<
  any,
  any,
  {
    type:
      | 'MAIN_C2C'
      | 'MAIN_UMFUTURE'
      | 'MAIN_CMFUTURE'
      | 'MAIN_MARGIN'
      | 'MAIN_MINING'
      | 'C2C_MAIN'
      | 'C2C_UMFUTURE'
      | 'C2C_MINING'
      | 'C2C_MARGIN'
      | 'UMFUTURE_MAIN'
      | 'UMFUTURE_C2C'
      | 'UMFUTURE_MARGIN'
      | 'CMFUTURE_MAIN'
      | 'CMFUTURE_MARGIN'
      | 'MARGIN_MAIN'
      | 'MARGIN_UMFUTURE'
      | 'MARGIN_CMFUTURE'
      | 'MARGIN_MINING'
      | 'MARGIN_C2C'
      | 'MINING_MAIN'
      | 'MINING_UMFUTURE'
      | 'MINING_C2C'
      | 'MINING_MARGIN'
      | 'MAIN_PAY'
      | 'PAY_MAIN'
      | 'ISOLATEDMARGIN_MARGIN'
      | 'MARGIN_ISOLATEDMARGIN'
      | 'ISOLATEDMARGIN_ISOLATEDMARGIN';
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    fromSymbol?: string;
    toSymbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            asset: string;
            amount: string;
            type: string;
            status: string;
            tranId: number; // int
            timestamp: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetTransferRequestResult = RequestResult<
  GetTransferRequest,
  GetTransferResponse
>;

export function getTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTransferRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTransferRequestResult> {
  return requestHandler.execute(
    createRequest(getTransferEndpointSchema, payload),
    config
  );
}
