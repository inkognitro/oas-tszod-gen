import {
  apiResponseZodSchema,
  ApiResponse,
} from '@example-outputs/petstore2-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2-with-zod/core';

export const uploadFileEndpointSchema = {
  path: '/pet/{petId}/uploadImage',
  method: 'post',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', requiredPermissions: ['write:pets', 'read:pets']},
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
  ResponseData<ResponseBodyData<'application/json', ApiResponse>>
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
