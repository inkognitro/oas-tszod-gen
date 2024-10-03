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

export const postSapiV1CapitalContractConvertibleCoinsEndpointSchema = {
  path: '/sapi/v1/capital/contract/convertible-coins',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type PostSapiV1CapitalContractConvertibleCoinsRequest = RequestUnion<
  any,
  any,
  {
    coin: string;
    enable: boolean;
  }
>;

export type PostSapiV1CapitalContractConvertibleCoinsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1CapitalContractConvertibleCoinsRequestResult =
  RequestResult<
    PostSapiV1CapitalContractConvertibleCoinsRequest,
    PostSapiV1CapitalContractConvertibleCoinsResponse
  >;

export function postSapiV1CapitalContractConvertibleCoins(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1CapitalContractConvertibleCoinsRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1CapitalContractConvertibleCoinsRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1CapitalContractConvertibleCoinsEndpointSchema,
      payload
    ),
    config
  );
}
