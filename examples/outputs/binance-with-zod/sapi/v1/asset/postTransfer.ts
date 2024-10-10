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

export const postTransferEndpointSchema = {
  path: '/sapi/v1/asset/transfer',
  method: 'post',
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
    asset: z.string(),
    amount: z.number().safe().finite(),
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
            tranId: z.number().int().safe().finite(),
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

export type PostTransferRequest = RequestUnion<
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
    asset: string;
    amount: number;
    fromSymbol?: string;
    toSymbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostTransferRequestResult = RequestResult<
  PostTransferRequest,
  PostTransferResponse
>;

export function postTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostTransferRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostTransferRequestResult> {
  return requestHandler.execute(
    createRequest(postTransferEndpointSchema, payload),
    config
  );
}
