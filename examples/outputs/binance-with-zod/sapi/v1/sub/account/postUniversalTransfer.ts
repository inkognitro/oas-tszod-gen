import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const postUniversalTransferEndpointSchema = {
  path: '/sapi/v1/sub-account/universalTransfer',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    fromEmail: z.string().optional(),
    toEmail: z.string().optional(),
    fromAccountType: z.enum([
      'SPOT',
      'USDT_FUTURE',
      'COIN_FUTURE',
      'MARGIN',
      'ISOLATED_MARGIN',
    ]),
    toAccountType: z.enum([
      'SPOT',
      'USDT_FUTURE',
      'COIN_FUTURE',
      'MARGIN',
      'ISOLATED_MARGIN',
    ]),
    clientTranId: z.string().optional(),
    symbol: z.string().optional(),
    asset: z.string(),
    amount: z.number().safe().finite(),
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
            clientTranId: z.string(),
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

export type PostUniversalTransferRequest = RequestUnion<
  any,
  any,
  {
    fromEmail?: string;
    toEmail?: string;
    fromAccountType:
      | 'SPOT'
      | 'USDT_FUTURE'
      | 'COIN_FUTURE'
      | 'MARGIN'
      | 'ISOLATED_MARGIN';
    toAccountType:
      | 'SPOT'
      | 'USDT_FUTURE'
      | 'COIN_FUTURE'
      | 'MARGIN'
      | 'ISOLATED_MARGIN';
    clientTranId?: string;
    symbol?: string;
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostUniversalTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
          clientTranId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostUniversalTransferRequestResult = RequestResult<
  PostUniversalTransferRequest,
  PostUniversalTransferResponse
>;

export function postUniversalTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostUniversalTransferRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostUniversalTransferRequestResult> {
  return requestHandler.execute(
    createRequest(postUniversalTransferEndpointSchema, payload),
    config
  );
}
