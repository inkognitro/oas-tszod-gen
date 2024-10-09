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
import {Issuing_Token, Error} from '@example-outputs/stripe';

export const postIssuingTokensTokenEndpointSchema = {
  path: '/v1/issuing/tokens/{token}',
  method: 'post',
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

export type PostIssuingTokensTokenRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      status: 'active' | 'deleted' | 'suspended';
    }
  >,
  {
    token: string;
  }
>;

export type PostIssuingTokensTokenResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Token>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingTokensTokenRequestResult = RequestResult<
  PostIssuingTokensTokenRequest,
  PostIssuingTokensTokenResponse
>;

export function postIssuingTokensToken(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingTokensTokenRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingTokensTokenRequestResult> {
  return requestHandler.execute(
    createRequest(postIssuingTokensTokenEndpointSchema, payload),
    config
  );
}
