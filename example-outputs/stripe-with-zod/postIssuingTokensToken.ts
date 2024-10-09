import {
  z_Issuing_Token,
  z_Error,
  Issuing_Token,
  Error,
} from '@example-outputs/stripe-with-zod';
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

export const postIssuingTokensTokenEndpointSchema = {
  path: '/v1/issuing/tokens/{token}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    token: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        status: z.enum(['active', 'deleted', 'suspended']),
      }),
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
