import {
  createRequest,
  Request,
  RequestExecutionConfig,
  RequestHandler,
  RequestResult,
  Response,
  StatusCode,
} from '../core';

export const uploadFileEndpointId = {
  method: 'post',
  path: '/v1/auth/upload-file',
};

type OkUploadFileResponse = Response<StatusCode.Ok, {accessToken: string}>;
type BadRequestUploadFileResponse = Response<StatusCode.BadRequest>;

export type UploadFileResponse =
  | OkUploadFileResponse
  | BadRequestUploadFileResponse;

export type UploadFileRequestResult = RequestResult<
  Request,
  UploadFileResponse
>;

export type UploadFilePayload = {
  body: object;
};

export function uploadFile(
  requestHandler: RequestHandler,
  payload: UploadFilePayload,
  config?: RequestExecutionConfig
): Promise<UploadFileRequestResult> {
  const request = createRequest({
    endpointId: uploadFileEndpointId,
    headers: {
      contentType: 'application/json',
    },
    body: payload.body,
  });
  return requestHandler.execute(request, config);
}
