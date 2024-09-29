import {ApiResponse} from '@example-outputs/petstore2';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

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

export type UploadFileRequestBody = {
  contentType: 'application/octet-stream';
  body: Blob | any;
};

export type UploadFilePayload = UploadFileRequestBody & {
  queryParams: {
    additionalMetadata?: string;
  };
  pathParams: {
    petId: number; // int
  };
};

export type UploadFileResponse = Response<
  200,
  ResponseBodyData<'application/json', ApiResponse>
>;

export type UploadFileRequestResult = RequestResult<
  Request,
  UploadFileResponse
>;

export function uploadFile(
  requestHandler: SimpleRequestHandler,
  payload: UploadFilePayload,
  config?: RequestHandlerExecutionConfig
): Promise<UploadFileRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: uploadFileEndpointSchema}),
    config
  );
}
