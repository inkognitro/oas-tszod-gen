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

export const postFileLinksEndpointSchema = {
  path: '/v1/file_links',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        expires_at: z.number().int().safe().finite().optional(),
        file: z.string(),
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
