import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const postSapiV1SimpleEarnLockedSetautosubscribeEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/setAutoSubscribe',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    positionId: z.string(),
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

export type PostSapiV1SimpleEarnLockedSetautosubscribeRequest = RequestUnion<
  any,
  any,
  {
    positionId: string;
    autoSubscribe: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SimpleEarnLockedSetautosubscribeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SimpleEarnLockedSetautosubscribeRequestResult =
  RequestResult<
    PostSapiV1SimpleEarnLockedSetautosubscribeRequest,
    PostSapiV1SimpleEarnLockedSetautosubscribeResponse
  >;

export function postSapiV1SimpleEarnLockedSetautosubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SimpleEarnLockedSetautosubscribeRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnLockedSetautosubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1SimpleEarnLockedSetautosubscribeEndpointSchema,
      payload
    ),
    config
  );
}
