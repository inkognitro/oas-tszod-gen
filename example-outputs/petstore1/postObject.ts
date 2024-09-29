import {
  $200OkDrsObjectResponse,
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

export const postObjectEndpointSchema = {
  path: '/objects/{object_id}',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', requiredPermissions: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': $200OkDrsObjectResponse,
    '202': $202AcceptedResponse,
    '400': $400BadRequestResponse,
    '401': $401UnauthorizedResponse,
    '403': $403ForbiddenResponse,
    '404': $404NotFoundAccessResponse,
    '500': $500InternalServerErrorResponse,
  },
};

export type PostObjectPayload = {
  pathParams: {
    object_id: string;
  };
};

export type PostObjectResponse =
  | $200OkDrsObjectResponse<200>
  | $202AcceptedResponse<202>
  | $400BadRequestResponse<400>
  | $401UnauthorizedResponse<401>
  | $403ForbiddenResponse<403>
  | $404NotFoundAccessResponse<404>
  | $500InternalServerErrorResponse<500>;

export type PostObjectRequestResult = RequestResult<
  Request,
  PostObjectResponse
>;

export function postObject(
  requestHandler: SimpleRequestHandler,
  payload: PostObjectPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostObjectRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: postObjectEndpointSchema}),
    config
  );
}
