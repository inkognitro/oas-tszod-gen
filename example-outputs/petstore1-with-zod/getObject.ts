import {
  $200OkDrsObjectResponse,
  $202AcceptedResponse,
  $400BadRequestResponse,
  $401UnauthorizedResponse,
  $403ForbiddenResponse,
  $404NotFoundDrsObjectResponse,
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

export const getObjectEndpointSchema = {
  path: '/objects/{object_id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.boolean().optional(),
  }),
  pathParamsZodSchema: z.object({
    object_id: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': $200OkDrsObjectResponse,
    '202': $202AcceptedResponse,
    '400': $400BadRequestResponse,
    '401': $401UnauthorizedResponse,
    '403': $403ForbiddenResponse,
    '404': $404NotFoundDrsObjectResponse,
    '500': $500InternalServerErrorResponse,
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
  | Response<200, $200OkDrsObjectResponse>
  | Response<202, $202AcceptedResponse>
  | Response<400, $400BadRequestResponse>
  | Response<401, $401UnauthorizedResponse>
  | Response<403, $403ForbiddenResponse>
  | Response<404, $404NotFoundDrsObjectResponse>
  | Response<500, $500InternalServerErrorResponse>;

export type GetObjectRequestResult = RequestResult<Request, GetObjectResponse>;

export function getObject(
  requestHandler: RequestHandler,
  payload: GetObjectPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetObjectRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getObjectEndpointSchema}),
    config
  );
}
