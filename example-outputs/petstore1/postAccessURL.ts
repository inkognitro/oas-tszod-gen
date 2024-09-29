import {
  $200OkAccessResponse,
  $202AcceptedResponse,
  $400BadRequestResponse,
  $401UnauthorizedResponse,
  $403ForbiddenResponse,
  $404NotFoundAccessResponse,
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

export const postAccessURLEndpointSchema = {
  path: '/objects/{object_id}/access/{access_id}',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', requiredPermissions: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': $200OkAccessResponse,
    '202': $202AcceptedResponse,
    '400': $400BadRequestResponse,
    '401': $401UnauthorizedResponse,
    '403': $403ForbiddenResponse,
    '404': $404NotFoundAccessResponse,
    '500': $500InternalServerErrorResponse,
  },
};

export type PostAccessURLPayload = {
  pathParams: {
    object_id: string;
    access_id: string;
  };
};

export type PostAccessURLResponse =
  | $200OkAccessResponse<200>
  | $202AcceptedResponse<202>
  | $400BadRequestResponse<400>
  | $401UnauthorizedResponse<401>
  | $403ForbiddenResponse<403>
  | $404NotFoundAccessResponse<404>
  | $500InternalServerErrorResponse<500>;

export type PostAccessURLRequestResult = RequestResult<
  Request,
  PostAccessURLResponse
>;

export function postAccessURL(
  requestHandler: SimpleRequestHandler,
  payload: PostAccessURLPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccessURLRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: postAccessURLEndpointSchema}),
    config
  );
}
