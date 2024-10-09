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
import {Login_link, Error} from '@example-outputs/stripe';

export const postAccountsAccountLoginLinksEndpointSchema = {
  path: '/v1/accounts/{account}/login_links',
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
