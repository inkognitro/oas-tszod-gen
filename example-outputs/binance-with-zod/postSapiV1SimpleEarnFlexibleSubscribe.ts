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

export const postSapiV1SimpleEarnFlexibleSubscribeEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/subscribe',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    productId: z.string(),
    amount: z.number().safe().finite(),
    autoSubscribe: z.boolean().optional(),
    sourceAccount: z.string().optional(),
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
            purchaseId: z.number().int().safe().finite(),
            success: z.boolean(),
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

export type PostSapiV1SimpleEarnFlexibleSubscribePayload = {
  queryParams: {
    productId: string;
    amount: number;
    autoSubscribe?: boolean;
    sourceAccount?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SimpleEarnFlexibleSubscribeResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            purchaseId: number; // int
            success: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1SimpleEarnFlexibleSubscribeRequestResult = RequestResult<
  Request,
  PostSapiV1SimpleEarnFlexibleSubscribeResponse
>;

export function postSapiV1SimpleEarnFlexibleSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SimpleEarnFlexibleSubscribePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnFlexibleSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SimpleEarnFlexibleSubscribeEndpointSchema,
    }),
    config
  );
}
