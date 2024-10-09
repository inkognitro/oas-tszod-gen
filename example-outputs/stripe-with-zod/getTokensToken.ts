import {z_Token, z_Error, Token, Error} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const getTokensTokenEndpointSchema = {
  path: '/v1/tokens/{token}',
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
          zodSchema: z_Token,
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
