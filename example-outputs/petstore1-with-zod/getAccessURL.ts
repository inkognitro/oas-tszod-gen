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
    '200': $200OkAccessResponse,
    '202': $202AcceptedResponse,
    '400': $400BadRequestResponse,
    '401': $401UnauthorizedResponse,
    '403': $403ForbiddenResponse,
    '404': $404NotFoundAccessResponse,
    '500': $500InternalServerErrorResponse,
  },
};

export type GetAccessURLPayload = {
  pathParams: {
    object_id: string;
    access_id: string;
  };
};

export type GetAccessURLResponse =
  | Response<200, $200OkAccessResponse>
  | Response<202, $202AcceptedResponse>
  | Response<400, $400BadRequestResponse>
  | Response<401, $401UnauthorizedResponse>
  | Response<403, $403ForbiddenResponse>
  | Response<404, $404NotFoundAccessResponse>
  | Response<500, $500InternalServerErrorResponse>;

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
