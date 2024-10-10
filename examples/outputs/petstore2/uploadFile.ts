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
import {ApiResponse} from './schemas';

export const uploadFileEndpointSchema = {
  path: '/pet/{petId}/uploadImage',
  method: 'post',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  bodyByContentType: {
    'application/octet-stream': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type UploadFileRequest = RequestUnion<
  RequestBodyData<'application/octet-stream', Blob | any>,
  {
    petId: number; // int
  },
  {
    additionalMetadata?: string;
  }
>;

export type UploadFileResponse = ResponseUnion<
  200,
  ResponseBodyData<'application/json', ApiResponse>
>;

export type UploadFileRequestResult = RequestResult<
  UploadFileRequest,
  UploadFileResponse
>;

export function uploadFile(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    UploadFileRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<UploadFileRequestResult> {
  return requestHandler.execute(
    createRequest(uploadFileEndpointSchema, payload),
    config
  );
}
