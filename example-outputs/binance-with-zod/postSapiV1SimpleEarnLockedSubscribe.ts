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

export const postSapiV1SimpleEarnLockedSubscribeEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/subscribe',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    projectId: z.string(),
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
            positionId: z.string(),
            success: z.boolean(),
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

export type PostSapiV1SimpleEarnLockedSubscribeRequest = RequestUnion<
  any,
  any,
  {
    projectId: string;
    amount: number;
    autoSubscribe?: boolean;
    sourceAccount?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SimpleEarnLockedSubscribeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          purchaseId: number; // int
          positionId: string;
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SimpleEarnLockedSubscribeRequestResult = RequestResult<
  PostSapiV1SimpleEarnLockedSubscribeRequest,
  PostSapiV1SimpleEarnLockedSubscribeResponse
>;

export function postSapiV1SimpleEarnLockedSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SimpleEarnLockedSubscribeRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnLockedSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SimpleEarnLockedSubscribeEndpointSchema, payload),
    config
  );
}
