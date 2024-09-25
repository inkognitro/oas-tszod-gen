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

export const postSapiV1MiningHashTransferConfigCancelEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/config/cancel',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    configId: z.string(),
    userName: z.string(),
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
            code: z.number().int().safe().finite(),
            msg: z.string(),
            data: z.boolean(),
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

export type PostSapiV1MiningHashTransferConfigCancelPayload = {
  queryParams: {
    configId: string;
    userName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1MiningHashTransferConfigCancelResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            code: number; // int
            msg: string;
            data: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1MiningHashTransferConfigCancelRequestResult =
  RequestResult<Request, PostSapiV1MiningHashTransferConfigCancelResponse>;

export function postSapiV1MiningHashTransferConfigCancel(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1MiningHashTransferConfigCancelPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MiningHashTransferConfigCancelRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MiningHashTransferConfigCancelEndpointSchema,
    }),
    config
  );
}
