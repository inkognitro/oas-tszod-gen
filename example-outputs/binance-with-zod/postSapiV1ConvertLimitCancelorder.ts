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

export type PostSapiV1ConvertLimitCancelorderRequest = RequestUnion<
  any,
  any,
  {
    orderId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1ConvertLimitCancelorderResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderId: number; // int
          status: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1ConvertLimitCancelorderRequestResult = RequestResult<
  PostSapiV1ConvertLimitCancelorderRequest,
  PostSapiV1ConvertLimitCancelorderResponse
>;

export function postSapiV1ConvertLimitCancelorder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1ConvertLimitCancelorderRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ConvertLimitCancelorderRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1ConvertLimitCancelorderEndpointSchema, payload),
    config
  );
}
