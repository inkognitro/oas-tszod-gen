import {
  $200OkDrsObjectsResponse,
  $202AcceptedResponse,
  $400BadRequestResponse,
  $401UnauthorizedResponse,
  $403ForbiddenResponse,
  $404NotFoundDrsObjectResponse,
  $413RequestTooLargeResponse,
  $500InternalServerErrorResponse,
  BulkObjectId,
} from '@example-outputs/petstore1';
import {
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1/core';

export const getBulkObjectsEndpointSchema = {
  path: '/objects',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', requiredPermissions: []}],
  bodyByContentType: {
    'application/json': {},
  },
  responseByStatus: {
    '200': $200OkDrsObjectsResponse,
    '202': $202AcceptedResponse,
    '400': $400BadRequestResponse,
    '401': $401UnauthorizedResponse,
    '403': $403ForbiddenResponse,
    '404': $404NotFoundDrsObjectResponse,
    '413': $413RequestTooLargeResponse,
    '500': $500InternalServerErrorResponse,
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
  | Response<200, $200OkDrsObjectsResponse>
  | Response<202, $202AcceptedResponse>
  | Response<400, $400BadRequestResponse>
  | Response<401, $401UnauthorizedResponse>
  | Response<403, $403ForbiddenResponse>
  | Response<404, $404NotFoundDrsObjectResponse>
  | Response<413, $413RequestTooLargeResponse>
  | Response<500, $500InternalServerErrorResponse>;

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
