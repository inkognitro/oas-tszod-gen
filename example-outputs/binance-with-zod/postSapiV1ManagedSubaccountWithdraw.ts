import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1ManagedSubaccountWithdrawEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/withdraw',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    fromEmail: z.string(),
    asset: z.string(),
    amount: z.number().safe().finite(),
    transferDate: z.number().int().safe().finite().optional(),
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
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type PostSapiV1ManagedSubaccountWithdrawPayload = {
  queryParams: {
    fromEmail: string;
    asset: string;
    amount: number;
    transferDate?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1ManagedSubaccountWithdrawResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            tranId: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1ManagedSubaccountWithdrawRequestResult = RequestResult<
  Request,
  PostSapiV1ManagedSubaccountWithdrawResponse
>;

export function postSapiV1ManagedSubaccountWithdraw(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1ManagedSubaccountWithdrawPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ManagedSubaccountWithdrawRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1ManagedSubaccountWithdrawEndpointSchema,
    }),
    config
  );
}
