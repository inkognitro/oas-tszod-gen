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

export const postSapiV1MarginBorrowRepayEndpointSchema = {
  path: '/sapi/v1/margin/borrow-repay',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    asset: z.string(),
    isIsolated: z.string(),
    symbol: z.string(),
    amount: z.number().safe().finite(),
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
            tranId: z.number().int().safe().finite(),
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

export type PostSapiV1MarginBorrowRepayPayload = {
  queryParams: {
    asset: string;
    isIsolated: string;
    symbol: string;
    amount: number;
    type: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1MarginBorrowRepayResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1MarginBorrowRepayRequestResult = RequestResult<
  Request,
  PostSapiV1MarginBorrowRepayResponse
>;

export function postSapiV1MarginBorrowRepay(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1MarginBorrowRepayPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MarginBorrowRepayRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MarginBorrowRepayEndpointSchema,
    }),
    config
  );
}
