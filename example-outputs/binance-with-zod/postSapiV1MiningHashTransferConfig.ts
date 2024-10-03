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

export const postSapiV1MiningHashTransferConfigEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/config',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    userName: z.string(),
    algo: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    toPoolUser: z.string(),
    hashRate: z.string(),
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
            data: z.number().int().safe().finite(),
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

export type PostSapiV1MiningHashTransferConfigRequest = RequestUnion<
  any,
  any,
  {
    userName: string;
    algo: string;
    startDate?: string;
    endDate?: string;
    toPoolUser: string;
    hashRate: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1MiningHashTransferConfigResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1MiningHashTransferConfigRequestResult = RequestResult<
  PostSapiV1MiningHashTransferConfigRequest,
  PostSapiV1MiningHashTransferConfigResponse
>;

export function postSapiV1MiningHashTransferConfig(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1MiningHashTransferConfigRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MiningHashTransferConfigRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1MiningHashTransferConfigEndpointSchema, payload),
    config
  );
}
