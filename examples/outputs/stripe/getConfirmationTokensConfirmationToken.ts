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
import {Confirmation_token, Error} from './schemas';

export const getConfirmationTokensConfirmationTokenEndpointSchema = {
  path: '/v1/confirmation_tokens/{confirmation_token}',
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
