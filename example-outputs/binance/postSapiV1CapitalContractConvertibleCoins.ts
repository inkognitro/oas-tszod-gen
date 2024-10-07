import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postSapiV1CapitalContractConvertibleCoinsEndpointSchema = {
  path: '/sapi/v1/capital/contract/convertible-coins',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
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
    'queryParams',
    never
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
