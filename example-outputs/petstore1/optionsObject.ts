import {
  $200OkAuthorizationsResponseSchema,
  authorizationsNotSupportedResponseSchema,
  $400BadRequestResponseSchema,
  $404NotFoundDrsObjectResponseSchema,
  $500InternalServerErrorResponseSchema,
  $200OkAuthorizationsResponse,
  AuthorizationsNotSupportedResponse,
  $400BadRequestResponse,
  $404NotFoundDrsObjectResponse,
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

export const optionsObjectEndpointSchema = {
  path: '/objects/{object_id}',
  method: 'options',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': $200OkAuthorizationsResponseSchema,
    '204': authorizationsNotSupportedResponseSchema,
    '400': $400BadRequestResponseSchema,
    '404': $404NotFoundDrsObjectResponseSchema,
    '405': authorizationsNotSupportedResponseSchema,
    '500': $500InternalServerErrorResponseSchema,
  },
};

export type OptionsObjectRequest = RequestUnion<
  any,
  {
    object_id: string;
  }
>;

export type OptionsObjectResponse =
  | $200OkAuthorizationsResponse<200>
  | AuthorizationsNotSupportedResponse<204>
  | $400BadRequestResponse<400>
  | $404NotFoundDrsObjectResponse<404>
  | AuthorizationsNotSupportedResponse<405>
  | $500InternalServerErrorResponse<500>;

export type OptionsObjectRequestResult = RequestResult<
  OptionsObjectRequest,
  OptionsObjectResponse
>;

export function optionsObject(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<OptionsObjectRequest, 'pathParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<OptionsObjectRequestResult> {
  return requestHandler.execute(
    createRequest(optionsObjectEndpointSchema, payload),
    config
  );
}
