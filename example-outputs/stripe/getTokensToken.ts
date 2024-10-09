import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe/core';
import {Token, Error} from '@example-outputs/stripe';

export const getTokensTokenEndpointSchema = {
  path: '/v1/tokens/{token}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetTokensTokenRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    token: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTokensTokenResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Token>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTokensTokenRequestResult = RequestResult<
  GetTokensTokenRequest,
  GetTokensTokenResponse
>;

export function getTokensToken(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTokensTokenRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTokensTokenRequestResult> {
  return requestHandler.execute(
    createRequest(getTokensTokenEndpointSchema, payload),
    config
  );
}
