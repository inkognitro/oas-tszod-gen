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

export const postSapiV1ConvertLimitCancelorderEndpointSchema = {
  path: '/sapi/v1/convert/limit/cancelOrder',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite(),
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
            orderId: z.number().int().safe().finite(),
            status: z.string(),
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

export type PostSapiV1ConvertLimitCancelorderPayload = {
  queryParams: {
    orderId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1ConvertLimitCancelorderResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderId: number; // int
          status: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1ConvertLimitCancelorderRequestResult = RequestResult<
  Request,
  PostSapiV1ConvertLimitCancelorderResponse
>;

export function postSapiV1ConvertLimitCancelorder(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1ConvertLimitCancelorderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ConvertLimitCancelorderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1ConvertLimitCancelorderEndpointSchema,
    }),
    config
  );
}
