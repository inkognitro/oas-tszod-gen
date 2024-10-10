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

export const getFileLinksLinkEndpointSchema = {
  path: '/v1/file_links/{link}',
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

export type GetFileLinksLinkRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    link: string;
  },
  {
    expand?: string[];
  }
>;

export type GetFileLinksLinkResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', File_link>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetFileLinksLinkRequestResult = RequestResult<
  GetFileLinksLinkRequest,
  GetFileLinksLinkResponse
>;

export function getFileLinksLink(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetFileLinksLinkRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetFileLinksLinkRequestResult> {
  return requestHandler.execute(
    createRequest(getFileLinksLinkEndpointSchema, payload),
    config
  );
}
