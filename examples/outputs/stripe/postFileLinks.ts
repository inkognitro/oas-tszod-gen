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
import {File_link, Error} from './schemas';

export const postFileLinksEndpointSchema = {
  path: '/v1/file_links',
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

export type PostFileLinksRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      expires_at?: number; // int
      file: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >
>;

export type PostFileLinksResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', File_link>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostFileLinksRequestResult = RequestResult<
  PostFileLinksRequest,
  PostFileLinksResponse
>;

export function postFileLinks(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostFileLinksRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostFileLinksRequestResult> {
  return requestHandler.execute(
    createRequest(postFileLinksEndpointSchema, payload),
    config
  );
}
