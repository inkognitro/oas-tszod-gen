import {
  z_Login_link,
  z_Error,
  Login_link,
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

export const postAccountsAccountLoginLinksEndpointSchema = {
  path: '/v1/accounts/{account}/login_links',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    account: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Login_link,
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

export type PostAccountsAccountLoginLinksRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    account: string;
  }
>;

export type PostAccountsAccountLoginLinksResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Login_link>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountsAccountLoginLinksRequestResult = RequestResult<
  PostAccountsAccountLoginLinksRequest,
  PostAccountsAccountLoginLinksResponse
>;

export function postAccountsAccountLoginLinks(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountsAccountLoginLinksRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountsAccountLoginLinksRequestResult> {
  return requestHandler.execute(
    createRequest(postAccountsAccountLoginLinksEndpointSchema, payload),
    config
  );
}
