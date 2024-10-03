import {
  apiResponseZodSchema,
  ApiResponse,
} from '@example-outputs/petstore2-with-zod';
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
} from '@example-outputs/petstore2-with-zod/core';

export const uploadFileEndpointSchema = {
  path: '/pet/{petId}/uploadImage',
  method: 'post',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  queryParamsZodSchema: z.object({
    additionalMetadata: z.string().optional(),
  }),
  pathParamsZodSchema: z.object({
    petId: z.number().int().safe().finite(),
  }),
  bodyByContentType: {
    'application/octet-stream': {
      zodSchema: z.any(),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: apiResponseZodSchema,
        },
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
    'pathParams' | 'queryParams' | 'contentType' | 'body'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<UploadFileRequestResult> {
  return requestHandler.execute(
    createRequest(uploadFileEndpointSchema, payload),
    config
  );
}
