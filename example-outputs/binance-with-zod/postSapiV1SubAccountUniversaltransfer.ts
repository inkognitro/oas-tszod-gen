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

export const postSapiV1SubAccountUniversaltransferEndpointSchema = {
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

export type PostSapiV1SubAccountUniversaltransferRequest = RequestUnion<
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

export type PostSapiV1SubAccountUniversaltransferResponse =
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

export type PostSapiV1SubAccountUniversaltransferRequestResult = RequestResult<
  PostSapiV1SubAccountUniversaltransferRequest,
  PostSapiV1SubAccountUniversaltransferResponse
>;

export function postSapiV1SubAccountUniversaltransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SubAccountUniversaltransferRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountUniversaltransferRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SubAccountUniversaltransferEndpointSchema, payload),
    config
  );
}
