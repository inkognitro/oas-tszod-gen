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
} from './responses';
import {
  RequestUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';

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

export type GetObjectRequest = RequestUnion<
  any,
  {
    object_id: string;
  },
  {
    expand?: boolean;
  }
>;

export type GetObjectResponse =
  | $200OkDrsObjectResponse<200>
  | $202AcceptedResponse<202>
  | $400BadRequestResponse<400>
  | $401UnauthorizedResponse<401>
  | $403ForbiddenResponse<403>
  | $404NotFoundDrsObjectResponse<404>
  | $500InternalServerErrorResponse<500>;

export type GetObjectRequestResult = RequestResult<
  GetObjectRequest,
  GetObjectResponse
>;

export function getObject(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetObjectRequest, 'pathParams', 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetObjectRequestResult> {
  return requestHandler.execute(
    createRequest(getObjectEndpointSchema, payload),
    config
  );
}
