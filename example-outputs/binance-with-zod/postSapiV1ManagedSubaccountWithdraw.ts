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

export const postSapiV1ManagedSubaccountWithdrawEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/withdraw',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type PostSapiV1ManagedSubaccountWithdrawRequest = RequestUnion<
  any,
  any,
  {
    fromEmail: string;
    asset: string;
    amount: number;
    transferDate?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1ManagedSubaccountWithdrawResponse =
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

export type PostSapiV1ManagedSubaccountWithdrawRequestResult = RequestResult<
  PostSapiV1ManagedSubaccountWithdrawRequest,
  PostSapiV1ManagedSubaccountWithdrawResponse
>;

export function postSapiV1ManagedSubaccountWithdraw(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1ManagedSubaccountWithdrawRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ManagedSubaccountWithdrawRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1ManagedSubaccountWithdrawEndpointSchema, payload),
    config
  );
}
