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

export const postSapiV1SimpleEarnLockedRedeemEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/redeem',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV1SimpleEarnLockedRedeemPayload = {
  queryParams: {
    positionId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SimpleEarnLockedRedeemResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          redeemId: number; // int
          success: boolean;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SimpleEarnLockedRedeemRequestResult = RequestResult<
  Request,
  PostSapiV1SimpleEarnLockedRedeemResponse
>;

export function postSapiV1SimpleEarnLockedRedeem(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SimpleEarnLockedRedeemPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnLockedRedeemRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SimpleEarnLockedRedeemEndpointSchema,
    }),
    config
  );
}
