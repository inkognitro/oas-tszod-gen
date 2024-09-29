import {
  $200OkAccessesResponse,
  $202AcceptedResponse,
  $400BadRequestResponse,
  $401UnauthorizedResponse,
  $403ForbiddenResponse,
  $404NotFoundAccessResponse,
  $413RequestTooLargeResponse,
  $500InternalServerErrorResponse,
  BulkObjectAccessId,
} from '@example-outputs/petstore1';
import {
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1/core';

export const getBulkAccessURLEndpointSchema = {
  path: '/objects/access',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', requiredPermissions: []}],
  bodyByContentType: {
    'application/json': {},
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
  | $200OkAccessesResponse<200>
  | $202AcceptedResponse<202>
  | $400BadRequestResponse<400>
  | $401UnauthorizedResponse<401>
  | $403ForbiddenResponse<403>
  | $404NotFoundAccessResponse<404>
  | $413RequestTooLargeResponse<413>
  | $500InternalServerErrorResponse<500>;

export type GetBulkAccessURLRequestResult = RequestResult<
  Request,
  GetBulkAccessURLResponse
>;

export function getBulkAccessURL(
  requestHandler: SimpleRequestHandler,
  payload: GetBulkAccessURLPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetBulkAccessURLRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getBulkAccessURLEndpointSchema}),
    config
  );
}
