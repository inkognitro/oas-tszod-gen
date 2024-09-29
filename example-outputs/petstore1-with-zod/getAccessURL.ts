import {
  $200OkAccessResponseSchema,
  $202AcceptedResponseSchema,
  $400BadRequestResponseSchema,
  $401UnauthorizedResponseSchema,
  $403ForbiddenResponseSchema,
  $404NotFoundAccessResponseSchema,
  $500InternalServerErrorResponseSchema,
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
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore1-with-zod/core';

export const getAccessURLEndpointSchema = {
  path: '/objects/{object_id}/access/{access_id}',
  method: 'get',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    object_id: z.string(),
    access_id: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': $200OkAccessResponseSchema,
    '202': $202AcceptedResponseSchema,
    '400': $400BadRequestResponseSchema,
    '401': $401UnauthorizedResponseSchema,
    '403': $403ForbiddenResponseSchema,
    '404': $404NotFoundAccessResponseSchema,
    '500': $500InternalServerErrorResponseSchema,
  },
};

export type GetAccessURLPayload = {
  pathParams: {
    object_id: string;
    access_id: string;
  };
};

export type GetAccessURLResponse =
  | $200OkAccessResponse<200>
  | $202AcceptedResponse<202>
  | $400BadRequestResponse<400>
  | $401UnauthorizedResponse<401>
  | $403ForbiddenResponse<403>
  | $404NotFoundAccessResponse<404>
  | $500InternalServerErrorResponse<500>;

export type GetAccessURLRequestResult = RequestResult<
  Request,
  GetAccessURLResponse
>;

export function getAccessURL(
  requestHandler: SimpleRequestHandler,
  payload: GetAccessURLPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccessURLRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getAccessURLEndpointSchema}),
    config
  );
}
