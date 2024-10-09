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
import {File_link, Error} from '@example-outputs/stripe';

export const postFileLinksLinkEndpointSchema = {
  path: '/v1/file_links/{link}',
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

export type PostFileLinksLinkRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      expires_at?: 'now' | number | '';
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    link: string;
  }
>;

export type PostFileLinksLinkResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', File_link>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostFileLinksLinkRequestResult = RequestResult<
  PostFileLinksLinkRequest,
  PostFileLinksLinkResponse
>;

export function postFileLinksLink(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostFileLinksLinkRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostFileLinksLinkRequestResult> {
  return requestHandler.execute(
    createRequest(postFileLinksLinkEndpointSchema, payload),
    config
  );
}
