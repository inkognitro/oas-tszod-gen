import {z_File, z_Error, File, Error} from './schemas';
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

export const getFilesFileEndpointSchema = {
  path: '/v1/files/{file}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    file: z.string(),
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
          zodSchema: z_File,
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

export type GetFilesFileRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    file: string;
  },
  {
    expand?: string[];
  }
>;

export type GetFilesFileResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', File>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetFilesFileRequestResult = RequestResult<
  GetFilesFileRequest,
  GetFilesFileResponse
>;

export function getFilesFile(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetFilesFileRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetFilesFileRequestResult> {
  return requestHandler.execute(
    createRequest(getFilesFileEndpointSchema, payload),
    config
  );
}
