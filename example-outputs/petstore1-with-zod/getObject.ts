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
  SimpleRequestHandler,
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
