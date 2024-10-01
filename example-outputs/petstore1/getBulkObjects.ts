import {
  $200OkDrsObjectsResponseSchema,
  $202AcceptedResponseSchema,
  $400BadRequestResponseSchema,
  $401UnauthorizedResponseSchema,
  $403ForbiddenResponseSchema,
  $404NotFoundDrsObjectResponseSchema,
  $413RequestTooLargeResponseSchema,
  $500InternalServerErrorResponseSchema,
  BulkObjectId,
  $200OkDrsObjectsResponse,
  $202AcceptedResponse,
  $400BadRequestResponse,
  $401UnauthorizedResponse,
  $403ForbiddenResponse,
  $404NotFoundDrsObjectResponse,
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

export const getBulkObjectsEndpointSchema = {
  path: '/objects',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', scopes: []}],
  bodyByContentType: {
    'application/json': {},
  },
  responseByStatus: {
    '200': $200OkDrsObjectsResponseSchema,
    '202': $202AcceptedResponseSchema,
    '400': $400BadRequestResponseSchema,
    '401': $401UnauthorizedResponseSchema,
    '403': $403ForbiddenResponseSchema,
    '404': $404NotFoundDrsObjectResponseSchema,
    '413': $413RequestTooLargeResponseSchema,
    '500': $500InternalServerErrorResponseSchema,
  },
};

export type GetBulkObjectsRequestBody = {
  contentType: 'application/json';
  body: BulkObjectId;
};

export type GetBulkObjectsPayload = GetBulkObjectsRequestBody & {
  queryParams: {
    expand?: boolean;
  };
};

export type GetBulkObjectsResponse =
  | $200OkDrsObjectsResponse<200>
  | $202AcceptedResponse<202>
  | $400BadRequestResponse<400>
  | $401UnauthorizedResponse<401>
  | $403ForbiddenResponse<403>
  | $404NotFoundDrsObjectResponse<404>
  | $413RequestTooLargeResponse<413>
  | $500InternalServerErrorResponse<500>;

export type GetBulkObjectsRequestResult = RequestResult<
  Request,
  GetBulkObjectsResponse
>;

export function getBulkObjects(
  requestHandler: SimpleRequestHandler,
  payload: GetBulkObjectsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetBulkObjectsRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getBulkObjectsEndpointSchema}),
    config
  );
}
