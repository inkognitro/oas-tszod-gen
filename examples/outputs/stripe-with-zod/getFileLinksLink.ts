import {z_File_link, z_Error, File_link, Error} from './schemas';
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
} from './core';

export const getFileLinksLinkEndpointSchema = {
  path: '/v1/file_links/{link}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    link: z.string(),
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
          zodSchema: z_File_link,
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
