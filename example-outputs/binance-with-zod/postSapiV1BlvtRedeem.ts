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

export const postSapiV1BlvtRedeemEndpointSchema = {
  path: '/sapi/v1/blvt/redeem',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    tokenName: z.string(),
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
            id: z.number().int().safe().finite(),
            status: z.string(),
            tokenName: z.string(),
            redeemAmount: z.string(),
            amount: z.string(),
            timestamp: z.number().int().safe().finite(),
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

export type PostSapiV1BlvtRedeemPayload = {
  queryParams: {
    tokenName: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1BlvtRedeemResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            id: number; // int
            status: string;
            tokenName: string;
            redeemAmount: string;
            amount: string;
            timestamp: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1BlvtRedeemRequestResult = RequestResult<
  Request,
  PostSapiV1BlvtRedeemResponse
>;

export function postSapiV1BlvtRedeem(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1BlvtRedeemPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1BlvtRedeemRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1BlvtRedeemEndpointSchema,
    }),
    config
  );
}
