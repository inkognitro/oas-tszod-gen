import {
  $200OkDrsObjectResponseSchema,
  $202AcceptedResponseSchema,
  $400BadRequestResponseSchema,
  $401UnauthorizedResponseSchema,
  $403ForbiddenResponseSchema,
  $404NotFoundDrsObjectResponseSchema,
  $500InternalServerErrorResponseSchema,
  $200OkDrsObjectResponse,
  $202AcceptedResponse,
  $400BadRequestResponse,
  $401UnauthorizedResponse,
  $403ForbiddenResponse,
  $404NotFoundDrsObjectResponse,
  $500InternalServerErrorResponse,
} from '@example-outputs/petstore1';
import {
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1/core';

export const getObjectEndpointSchema = {
  path: '/objects/{object_id}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': $200OkDrsObjectResponseSchema,
    '202': $202AcceptedResponseSchema,
    '400': $400BadRequestResponseSchema,
    '401': $401UnauthorizedResponseSchema,
    '403': $403ForbiddenResponseSchema,
    '404': $404NotFoundDrsObjectResponseSchema,
    '500': $500InternalServerErrorResponseSchema,
  },
};

export type GetObjectPayload = {
  queryParams: {
    expand?: boolean;
  };
  pathParams: {
    object_id: string;
  };
};

export type GetObjectResponse =
  | $200OkDrsObjectResponse<200>
  | $202AcceptedResponse<202>
  | $400BadRequestResponse<400>
  | $401UnauthorizedResponse<401>
  | $403ForbiddenResponse<403>
  | $404NotFoundDrsObjectResponse<404>
  | $500InternalServerErrorResponse<500>;

export type GetObjectRequestResult = RequestResult<Request, GetObjectResponse>;

export function getObject(
  requestHandler: SimpleRequestHandler,
  payload: GetObjectPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetObjectRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getObjectEndpointSchema}),
    config
  );
}
