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

export const postSapiV1SubAccountBlvtEnableEndpointSchema = {
  path: '/sapi/v1/sub-account/blvt/enable',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    enableBlvt: z.boolean(),
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
            email: z.string(),
            enableBlvt: z.boolean(),
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

export type PostSapiV1SubAccountBlvtEnableRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    enableBlvt: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SubAccountBlvtEnableResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          enableBlvt: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountBlvtEnableRequestResult = RequestResult<
  PostSapiV1SubAccountBlvtEnableRequest,
  PostSapiV1SubAccountBlvtEnableResponse
>;

export function postSapiV1SubAccountBlvtEnable(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1SubAccountBlvtEnableRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountBlvtEnableRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SubAccountBlvtEnableEndpointSchema, payload),
    config
  );
}
