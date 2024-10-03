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

export const postSapiV1SimpleEarnLockedRedeemEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/redeem',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    positionId: z.string(),
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
            redeemId: z.number().int().safe().finite(),
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

export type PostSapiV1SimpleEarnLockedRedeemRequest = RequestUnion<
  any,
  any,
  {
    positionId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SimpleEarnLockedRedeemResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          redeemId: number; // int
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SimpleEarnLockedRedeemRequestResult = RequestResult<
  PostSapiV1SimpleEarnLockedRedeemRequest,
  PostSapiV1SimpleEarnLockedRedeemResponse
>;

export function postSapiV1SimpleEarnLockedRedeem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SimpleEarnLockedRedeemRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnLockedRedeemRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SimpleEarnLockedRedeemEndpointSchema, payload),
    config
  );
}
