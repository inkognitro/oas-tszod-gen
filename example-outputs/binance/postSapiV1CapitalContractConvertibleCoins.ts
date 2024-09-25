import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1CapitalContractConvertibleCoinsEndpointSchema = {
  path: '/sapi/v1/capital/contract/convertible-coins',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV1CapitalContractConvertibleCoinsPayload = {
  queryParams: {
    coin: string;
    enable: boolean;
  };
};

export type PostSapiV1CapitalContractConvertibleCoinsResponse =
  | Response<200, ResponseData<ResponseBodyData<'application/json', {}>>>
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

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
