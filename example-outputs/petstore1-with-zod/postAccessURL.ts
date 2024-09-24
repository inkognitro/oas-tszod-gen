import {
  $200OkAccessResponse,
  $202AcceptedResponse,
  $400BadRequestResponse,
  $401UnauthorizedResponse,
  $403ForbiddenResponse,
  $404NotFoundAccessResponse,
  $500InternalServerErrorResponse,
} from '@example-outputs/petstore1-with-zod';
import {z} from 'zod';
import {
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1-with-zod/core';

export const postAccessURLEndpointSchema = {
  path: '/objects/{object_id}/access/{access_id}',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', requiredPermissions: []}],
  pathParamsZodSchema: z.object({
    object_id: z.string(),
    access_id: z.string(),
  }),
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
  | Response<200, $200OkAccessResponse>
  | Response<202, $202AcceptedResponse>
  | Response<400, $400BadRequestResponse>
  | Response<401, $401UnauthorizedResponse>
  | Response<403, $403ForbiddenResponse>
  | Response<404, $404NotFoundAccessResponse>
  | Response<500, $500InternalServerErrorResponse>;

export type PostAccessURLRequestResult = RequestResult<
  Request,
  PostAccessURLResponse
>;

export function postAccessURL(
  requestHandler: RequestHandler,
  payload: PostAccessURLPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccessURLRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: postAccessURLEndpointSchema}),
    config
  );
}
