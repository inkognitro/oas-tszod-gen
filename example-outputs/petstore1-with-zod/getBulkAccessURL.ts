import {
  bulkObjectAccessIdZodSchema,
  $200OkAccessesResponse,
  $202AcceptedResponse,
  $400BadRequestResponse,
  $401UnauthorizedResponse,
  $403ForbiddenResponse,
  $404NotFoundAccessResponse,
  $413RequestTooLargeResponse,
  $500InternalServerErrorResponse,
  BulkObjectAccessId,
} from '@example-outputs/petstore1-with-zod';
import {
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1-with-zod/core';

export const getBulkAccessURLEndpointSchema = {
  path: '/objects/access',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', requiredPermissions: []}],
  bodyByContentType: {
    'application/json': {
      zodSchema: bulkObjectAccessIdZodSchema,
    },
  },
  responseByStatus: {
    '200': $200OkAccessesResponse,
    '202': $202AcceptedResponse,
    '400': $400BadRequestResponse,
    '401': $401UnauthorizedResponse,
    '403': $403ForbiddenResponse,
    '404': $404NotFoundAccessResponse,
    '413': $413RequestTooLargeResponse,
    '500': $500InternalServerErrorResponse,
  },
};

export type GetBulkAccessURLRequestBody = {
  contentType: 'application/json';
  body: BulkObjectAccessId;
};

export type GetBulkAccessURLPayload = GetBulkAccessURLRequestBody;

export type GetBulkAccessURLResponse =
  | Response<200, $200OkAccessesResponse>
  | Response<202, $202AcceptedResponse>
  | Response<400, $400BadRequestResponse>
  | Response<401, $401UnauthorizedResponse>
  | Response<403, $403ForbiddenResponse>
  | Response<404, $404NotFoundAccessResponse>
  | Response<413, $413RequestTooLargeResponse>
  | Response<500, $500InternalServerErrorResponse>;

export type GetBulkAccessURLRequestResult = RequestResult<
  Request,
  GetBulkAccessURLResponse
>;

export function getBulkAccessURL(
  requestHandler: RequestHandler,
  payload: GetBulkAccessURLPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetBulkAccessURLRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getBulkAccessURLEndpointSchema}),
    config
  );
}
