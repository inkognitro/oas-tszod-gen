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

export const postSapiV1SubAccountTransferSubtosubEndpointSchema = {
  path: '/sapi/v1/sub-account/transfer/subToSub',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    toEmail: z.string(),
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
            txnId: z.string(),
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

export type PostSapiV1SubAccountTransferSubtosubPayload = {
  queryParams: {
    toEmail: string;
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SubAccountTransferSubtosubResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          txnId: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountTransferSubtosubRequestResult = RequestResult<
  Request,
  PostSapiV1SubAccountTransferSubtosubResponse
>;

export function postSapiV1SubAccountTransferSubtosub(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SubAccountTransferSubtosubPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountTransferSubtosubRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountTransferSubtosubEndpointSchema,
    }),
    config
  );
}
