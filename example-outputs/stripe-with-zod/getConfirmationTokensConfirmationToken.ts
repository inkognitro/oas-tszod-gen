import {
  z_Confirmation_token,
  z_Error,
  Confirmation_token,
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

export const getConfirmationTokensConfirmationTokenEndpointSchema = {
  path: '/v1/confirmation_tokens/{confirmation_token}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    confirmation_token: z.string(),
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
          zodSchema: z_Confirmation_token,
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

export type GetConfirmationTokensConfirmationTokenRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    confirmation_token: string;
  },
  {
    expand?: string[];
  }
>;

export type GetConfirmationTokensConfirmationTokenResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Confirmation_token>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetConfirmationTokensConfirmationTokenRequestResult = RequestResult<
  GetConfirmationTokensConfirmationTokenRequest,
  GetConfirmationTokensConfirmationTokenResponse
>;

export function getConfirmationTokensConfirmationToken(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetConfirmationTokensConfirmationTokenRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetConfirmationTokensConfirmationTokenRequestResult> {
  return requestHandler.execute(
    createRequest(
      getConfirmationTokensConfirmationTokenEndpointSchema,
      payload
    ),
    config
  );
}
