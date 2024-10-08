import {
  postObjectBodyRequestBodySchema,
  $200OkDrsObjectResponseSchema,
  $202AcceptedResponseSchema,
  $400BadRequestResponseSchema,
  $401UnauthorizedResponseSchema,
  $403ForbiddenResponseSchema,
  $404NotFoundAccessResponseSchema,
  $500InternalServerErrorResponseSchema,
  PostObjectBodyRequestBody,
  $200OkDrsObjectResponse,
  $202AcceptedResponse,
  $400BadRequestResponse,
  $401UnauthorizedResponse,
  $403ForbiddenResponse,
  $404NotFoundAccessResponse,
  $500InternalServerErrorResponse,
} from '@example-outputs/petstore1';
import {
  RequestUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore1/core';

export const postObjectEndpointSchema = {
  path: '/objects/{object_id}',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', scopes: []}],
  bodyByContentType: postObjectBodyRequestBodySchema,
  responseByStatus: {
    '200': $200OkDrsObjectResponseSchema,
    '202': $202AcceptedResponseSchema,
    '400': $400BadRequestResponseSchema,
    '401': $401UnauthorizedResponseSchema,
    '403': $403ForbiddenResponseSchema,
    '404': $404NotFoundAccessResponseSchema,
    '500': $500InternalServerErrorResponseSchema,
  },
};

export type PostObjectRequest = RequestUnion<
  PostObjectBodyRequestBody,
  {
    object_id: string;
  }
>;

export type PostObjectResponse =
  | $200OkDrsObjectResponse<200>
  | $202AcceptedResponse<202>
  | $400BadRequestResponse<400>
  | $401UnauthorizedResponse<401>
  | $403ForbiddenResponse<403>
  | $404NotFoundAccessResponse<404>
  | $500InternalServerErrorResponse<500>;

export type PostObjectRequestResult = RequestResult<
  PostObjectRequest,
  PostObjectResponse
>;

export function postObject(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostObjectRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostObjectRequestResult> {
  return requestHandler.execute(
    createRequest(postObjectEndpointSchema, payload),
    config
  );
}
