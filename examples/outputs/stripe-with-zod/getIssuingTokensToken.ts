import {z_Issuing_Token, Issuing_Token} from './issuing';
import {z_Error, Error} from './schemas';
import {z} from 'zod';
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

export const getIssuingTokensTokenEndpointSchema = {
  path: '/v1/issuing/tokens/{token}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    token: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Issuing_Token,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
