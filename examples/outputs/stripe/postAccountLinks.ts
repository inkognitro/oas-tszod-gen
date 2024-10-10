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
import {Account_link, Error} from './schemas';

export const postAccountLinksEndpointSchema = {
  path: '/v1/account_links',
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

export type PostAccountLinksRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      account: string;
      collect?: 'currently_due' | 'eventually_due';
      collection_options?: {
        fields?: 'currently_due' | 'eventually_due';
        future_requirements?: 'include' | 'omit';
      };
      expand?: string[];
      refresh_url?: string;
      return_url?: string;
      type: 'account_onboarding' | 'account_update';
    }
  >
>;

export type PostAccountLinksResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Account_link>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountLinksRequestResult = RequestResult<
  PostAccountLinksRequest,
  PostAccountLinksResponse
>;

export function postAccountLinks(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountLinksRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountLinksRequestResult> {
  return requestHandler.execute(
    createRequest(postAccountLinksEndpointSchema, payload),
    config
  );
}
