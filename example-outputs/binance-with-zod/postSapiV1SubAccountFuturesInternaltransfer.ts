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

export const postSapiV1SubAccountFuturesInternaltransferEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/internalTransfer',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    fromEmail: z.string(),
    toEmail: z.string(),
    futuresType: z.number().int().safe().finite(),
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
            success: z.boolean(),
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

export type PostSapiV1SubAccountFuturesInternaltransferPayload = {
  queryParams: {
    fromEmail: string;
    toEmail: string;
    futuresType: number; // int
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SubAccountFuturesInternaltransferResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            success: boolean;
            txnId: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1SubAccountFuturesInternaltransferRequestResult =
  RequestResult<Request, PostSapiV1SubAccountFuturesInternaltransferResponse>;

export function postSapiV1SubAccountFuturesInternaltransfer(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SubAccountFuturesInternaltransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountFuturesInternaltransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountFuturesInternaltransferEndpointSchema,
    }),
    config
  );
}
