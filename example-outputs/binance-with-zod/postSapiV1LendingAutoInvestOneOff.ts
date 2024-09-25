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

export const postSapiV1LendingAutoInvestOneOffEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/one-off',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    sourceType: z.string(),
    requestId: z.string().optional(),
    subscriptionAmount: z.number().safe().finite(),
    sourceAsset: z.string(),
    flexibleAllowedToUse: z.boolean().optional(),
    planId: z.number().int().safe().finite().optional(),
    indexId: z.number().int().safe().finite().optional(),
    details: z
      .array(
        z.object({
          targetAsset: z.string().optional(),
          percentage: z.number().int().safe().finite().optional(),
        })
      )
      .optional(),
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
            transactionId: z.number().int().safe().finite(),
            waitSecond: z.number().int().safe().finite(),
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

export type PostSapiV1LendingAutoInvestOneOffPayload = {
  queryParams: {
    sourceType: string;
    requestId?: string;
    subscriptionAmount: number;
    sourceAsset: string;
    flexibleAllowedToUse?: boolean;
    planId?: number; // int
    indexId?: number; // int
    details?: {
      targetAsset?: string;
      percentage?: number; // int
    }[];
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LendingAutoInvestOneOffResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            transactionId: number; // int
            waitSecond: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1LendingAutoInvestOneOffRequestResult = RequestResult<
  Request,
  PostSapiV1LendingAutoInvestOneOffResponse
>;

export function postSapiV1LendingAutoInvestOneOff(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LendingAutoInvestOneOffPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingAutoInvestOneOffRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LendingAutoInvestOneOffEndpointSchema,
    }),
    config
  );
}
