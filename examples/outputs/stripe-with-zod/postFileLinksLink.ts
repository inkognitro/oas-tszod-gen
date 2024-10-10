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

export const postFileLinksLinkEndpointSchema = {
  path: '/v1/file_links/{link}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    link: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        expires_at: z
          .union([
            z.enum(['now']),
            z.number().int().safe().finite(),
            z.enum(['']),
          ])
          .optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
      }),
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
