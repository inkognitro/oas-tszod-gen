import {
  bulkObjectIdZodSchema,
  $200OkDrsObjectsResponse,
  $202AcceptedResponse,
  $400BadRequestResponse,
  $401UnauthorizedResponse,
  $403ForbiddenResponse,
  $404NotFoundDrsObjectResponse,
  $413RequestTooLargeResponse,
  $500InternalServerErrorResponse,
  BulkObjectId,
} from '@example-outputs/petstore1-with-zod';
import {z} from 'zod';
import {
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1-with-zod/core';

export const getBulkObjectsEndpointSchema = {
  path: '/objects',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    expand: z.boolean().optional(),
  }),
  bodyByContentType: {
    'application/json': {
      zodSchema: bulkObjectIdZodSchema,
    },
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
