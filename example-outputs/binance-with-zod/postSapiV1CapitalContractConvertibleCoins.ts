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

export const postSapiV1CapitalContractConvertibleCoinsEndpointSchema = {
  path: '/sapi/v1/capital/contract/convertible-coins',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    coin: z.string(),
    enable: z.boolean(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({}),
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

export type PostSapiV1CapitalContractConvertibleCoinsPayload = {
  queryParams: {
    coin: string;
    enable: boolean;
  };
};

export type PostSapiV1CapitalContractConvertibleCoinsResponse =
  | Response<200, ResponseBodyData<'application/json', {}>>
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1CapitalContractConvertibleCoinsRequestResult =
  RequestResult<Request, PostSapiV1CapitalContractConvertibleCoinsResponse>;

export function postSapiV1CapitalContractConvertibleCoins(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1CapitalContractConvertibleCoinsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1CapitalContractConvertibleCoinsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1CapitalContractConvertibleCoinsEndpointSchema,
    }),
    config
  );
}
