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
} from './core';
import {Issuing_Token} from './issuing';
import {Error} from './schemas';

export const getIssuingTokensTokenEndpointSchema = {
  path: '/v1/issuing/tokens/{token}',
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

export type GetIssuingTokensTokenRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    token: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingTokensTokenResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Token>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingTokensTokenRequestResult = RequestResult<
  GetIssuingTokensTokenRequest,
  GetIssuingTokensTokenResponse
>;

export function getIssuingTokensToken(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingTokensTokenRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingTokensTokenRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingTokensTokenEndpointSchema, payload),
    config
  );
}
