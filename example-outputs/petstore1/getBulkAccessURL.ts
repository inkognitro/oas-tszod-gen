import {
  $200OkAccessesResponseSchema,
  $202AcceptedResponseSchema,
  $400BadRequestResponseSchema,
  $401UnauthorizedResponseSchema,
  $403ForbiddenResponseSchema,
  $404NotFoundAccessResponseSchema,
  $413RequestTooLargeResponseSchema,
  $500InternalServerErrorResponseSchema,
  BulkObjectAccessId,
  $200OkAccessesResponse,
  $202AcceptedResponse,
  $400BadRequestResponse,
  $401UnauthorizedResponse,
  $403ForbiddenResponse,
  $404NotFoundAccessResponse,
  $413RequestTooLargeResponse,
  $500InternalServerErrorResponse,
} from '@example-outputs/petstore1';
import {
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1/core';

export const getBulkAccessURLEndpointSchema = {
  path: '/objects/access',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', scopes: []}],
  bodyByContentType: {
    'application/json': {},
  },
  responseByStatus: {
    '200': $200OkAccessesResponseSchema,
    '202': $202AcceptedResponseSchema,
    '400': $400BadRequestResponseSchema,
    '401': $401UnauthorizedResponseSchema,
    '403': $403ForbiddenResponseSchema,
    '404': $404NotFoundAccessResponseSchema,
    '413': $413RequestTooLargeResponseSchema,
    '500': $500InternalServerErrorResponseSchema,
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
