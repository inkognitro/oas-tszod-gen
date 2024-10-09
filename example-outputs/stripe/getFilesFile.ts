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
import {File, Error} from '@example-outputs/stripe';

export const getFilesFileEndpointSchema = {
  path: '/v1/files/{file}',
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
