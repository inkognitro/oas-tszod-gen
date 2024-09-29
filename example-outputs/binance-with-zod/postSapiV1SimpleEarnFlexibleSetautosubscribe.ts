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

export const postSapiV1SimpleEarnFlexibleSetautosubscribeEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/setAutoSubscribe',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    productId: z.string(),
    autoSubscribe: z.boolean(),
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

export type PostSapiV1SimpleEarnFlexibleSetautosubscribePayload = {
  queryParams: {
    productId: string;
    autoSubscribe: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SimpleEarnFlexibleSetautosubscribeResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SimpleEarnFlexibleSetautosubscribeRequestResult =
  RequestResult<Request, PostSapiV1SimpleEarnFlexibleSetautosubscribeResponse>;

export function postSapiV1SimpleEarnFlexibleSetautosubscribe(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SimpleEarnFlexibleSetautosubscribePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnFlexibleSetautosubscribeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        postSapiV1SimpleEarnFlexibleSetautosubscribeEndpointSchema,
    }),
    config
  );
}
